package com.ttknp.springbootcrudforreacthooksandformik.service;

import com.ttknp.springbootcrudforreacthooksandformik.model.Student;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface StudentService {
    Student getStudentById(long id);
    List<Student> getStudents();
    Boolean addStudent(Student student, MultipartFile multipartFile);
    Boolean updateStudent(Student student, MultipartFile multipartFile);
    Boolean deleteStudent(long id);
}
