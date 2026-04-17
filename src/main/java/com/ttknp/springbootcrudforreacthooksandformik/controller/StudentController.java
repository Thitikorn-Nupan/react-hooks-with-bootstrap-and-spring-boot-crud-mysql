package com.ttknp.springbootcrudforreacthooksandformik.controller;

import com.ttknp.responsecustomservice.constant.CommonStatus;
import com.ttknp.responsecustomservice.entity.ResponseObject;
import com.ttknp.springbootcrudforreacthooksandformik.model.Student;
import com.ttknp.springbootcrudforreacthooksandformik.service.StudentService;
import com.ttknp.webcustomservice.annotation.CommonRestAPI;
import jakarta.annotation.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@CommonRestAPI(configPath = {"/api/students","/api/student"}, configOrigins = {"http://localhost:5173","http://localhost:3000"})
public class StudentController {

    private static final Logger log = LoggerFactory.getLogger(StudentController.class);
    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping(value = "/selectAll")
    private ResponseEntity<ResponseObject<List<Student>>> selectAll() {
        log.info("Select all students");
        return ResponseEntity
                .status((Short) CommonStatus.OK[0])
                .body(ResponseObject.builder()
                        .status((Short) CommonStatus.OK[0])
                        .info((String) CommonStatus.OK[1])
                        .data(studentService.getStudents())
                        .build()
                );
    }

    @GetMapping(value = "/selectOne/{sid}")
    private ResponseEntity<ResponseObject<List<Student>>> selectOne(@PathVariable Long sid) {
        log.info("Select one student by id: {}", sid);
        return ResponseEntity
                .status((Short) CommonStatus.OK[0])
                .body(ResponseObject.builder()
                        .status((Short) CommonStatus.OK[0])
                        .info((String) CommonStatus.OK[1])
                        .data(studentService.getStudentById(sid))
                        .build()
                );
    }

    // The standard way to handle both files and complex data (like a JSON object) in a single request
    // In spring is to use the @RequestPart annotation, with the request's Content-Type set to multipart/form-data
    // So now you can pass both thru form-data and json types ex, src/main/resources/ex-pass-req-file-and-json-in-single-req.png
    @PostMapping(value = "/insertOne",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    private ResponseEntity<ResponseObject<Boolean>> insertOne(@RequestParam("file") MultipartFile multipartFile ,
                                                              @RequestPart Student student) {
        log.info("Insert one student RequestPart : {}", student);
        log.info("Insert one student RequestPart : {}", multipartFile);
        return ResponseEntity
                .status((Short) CommonStatus.CREATE[0])
                .body(ResponseObject.builder()
                        .status((Short) CommonStatus.CREATE[0])
                        .info((String) CommonStatus.CREATE[1])
                        .data(studentService.addStudent(student, multipartFile))
                        .build()
                );
    }

    @PutMapping(value = "/updateOne")
    private ResponseEntity<ResponseObject<Boolean>> updateOne(@RequestParam("file") @Nullable MultipartFile multipartFile,
                                                              @RequestPart Student student) {
        log.info("Update one student as RequestPart : {}", student);
        log.info("Update one student as RequestPart : {}", multipartFile);
        return ResponseEntity
                .status((Short) CommonStatus.ACCEPTED[0])
                .body(ResponseObject.builder()
                        .status((Short) CommonStatus.ACCEPTED[0])
                        .info((String) CommonStatus.ACCEPTED[1])
                        .data(studentService.updateStudent(student,multipartFile))
                        .build()
                );
    }

    @DeleteMapping(value = "/deleteOne/{sid}")
    public ResponseEntity<ResponseObject<Boolean>> deleteModel(@PathVariable Long sid) {
        log.info("Delete one student by id: {}", sid);
        return ResponseEntity
                .status((Short) CommonStatus.ACCEPTED[0])
                .body(ResponseObject.builder()
                        .status((Short) CommonStatus.ACCEPTED[0])
                        .info((String) CommonStatus.ACCEPTED[1])
                        .data(studentService.deleteStudent(sid))
                        .build()
                );
    }

}
