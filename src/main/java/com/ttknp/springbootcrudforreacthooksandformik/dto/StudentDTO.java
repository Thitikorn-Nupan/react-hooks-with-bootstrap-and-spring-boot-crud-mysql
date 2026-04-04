package com.ttknp.springbootcrudforreacthooksandformik.dto;

import com.ttknp.jdbccustomservice.jdbc.select.JdbcSelectHelper;
import com.ttknp.jdbccustomservice.jdbc.update.JdbcInsertUpdateDeleteHelper;
import com.ttknp.managefile.dto.FileDTO;
import com.ttknp.springbootcrudforreacthooksandformik.model.Student;
import com.ttknp.springbootcrudforreacthooksandformik.service.StudentService;
import com.ttknp.webcustomservice.exception.ContentNotAllowed;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@Service
public class StudentDTO implements StudentService {

    private static final Logger log = LoggerFactory.getLogger(StudentDTO.class);
    private final JdbcSelectHelper<Student> jdbcSelectHelper;
    private final JdbcInsertUpdateDeleteHelper<Student> jdbcInsertUpdateDeleteHelper;
    private final FileDTO fileDTO;
    private final String FILE_DIR_ON_LOCALHOST;

    @Autowired
    public StudentDTO(JdbcSelectHelper<Student> jdbcSelectHelper,
                      JdbcInsertUpdateDeleteHelper<Student> jdbcInsertUpdateDeleteHelper,
                      @Value("${target.images.dir}") String FILE_DIR_ON_LOCALHOST) {
        this.fileDTO = new FileDTO();
        this.jdbcSelectHelper = jdbcSelectHelper;
        this.jdbcInsertUpdateDeleteHelper = jdbcInsertUpdateDeleteHelper;
        this.FILE_DIR_ON_LOCALHOST = FILE_DIR_ON_LOCALHOST;
        fileDTO.setPathToWork(FILE_DIR_ON_LOCALHOST);
    }

    private Integer countStudentsById(Long sid) {
        return jdbcSelectHelper.selectCount(Student.class, "sid", sid);
    }

    private Integer countStudents() {
        return jdbcSelectHelper.selectCount(Student.class);
    }

    private void deleteOldImageProfileByStudentId(Long id) {
        String imageProfile = jdbcSelectHelper
                .selectOneOnlyColumn(Student.class, String.class, "image_profile", "sid", id)
                .replace(FILE_DIR_ON_LOCALHOST + "\\", "");
        fileDTO.deleteFileFromTarget(imageProfile);
        log.info("deleted filename = {}", imageProfile);
    }

    private String uploadImageProfile(MultipartFile file) {
        return FILE_DIR_ON_LOCALHOST + "\\" + fileDTO.uploadFileToTargetReturnFilename(file);
    }

    @Override
    public Student getStudentById(long id) {
        if (countStudentsById(id) > 0) {
            return jdbcSelectHelper.selectOne(Student.class, "sid", id);
        }
        throw new RuntimeException("Student is not id "+id);
    }

    @Override
    public List<Student> getStudents() {
        if (countStudents() > 0) {
            return jdbcSelectHelper.selectAll(Student.class);
        }
        throw new RuntimeException("Students are not existed");
    }

    @Override
    public Boolean addStudent(Student student, MultipartFile multipartFile) {
        String filename =  uploadImageProfile(multipartFile);
        student.setImageProfile(filename);
        try {
            return jdbcInsertUpdateDeleteHelper.insertOne(Student.class, student) > 0;
        } catch (IllegalAccessException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Boolean updateStudent(Student student, MultipartFile multipartFile) {
        String filename;
        if (countStudentsById(student.getSid()) > 0) {
            if (multipartFile != null) {
                // upload new file
                filename =  uploadImageProfile(multipartFile);
                // then deletes old file
                deleteOldImageProfileByStudentId(student.getSid());
            } else {
                // get old file
                filename  = jdbcSelectHelper
                        .selectOneOnlyColumn(Student.class, String.class, "image_profile", "sid", student.getSid());
            }
            student.setImageProfile(filename);
            try {
                return jdbcInsertUpdateDeleteHelper.updateOne(Student.class, "sid", student) > 0;
            } catch (IllegalAccessException e) {
                throw new ContentNotAllowed(e);
            }
        }
        throw new RuntimeException("Student is not existed");
    }

    @Override
    public Boolean deleteStudent(long id) {
        if (countStudentsById(id) > 0) {
            deleteOldImageProfileByStudentId(id);
            try {
                return jdbcInsertUpdateDeleteHelper.deleteOne(Student.class, "sid", id) > 0;
            } catch (IllegalAccessException e) {
                throw new ContentNotAllowed(e);
            }
        }
        throw new RuntimeException("Student is not existed");
    }
}
