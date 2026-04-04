package com.ttknp.springbootcrudforreacthooksandformik.model;

import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table(name = "students")
public class Student {
    private Long sid;
    private String fullname;
    @Column("birthday_year")
    private Short birthdayYear;
    @Column("full_address")
    private String fullAddress;
    private String zipcode;
    private String status;
    private String email;
    @Column("image_profile")
    private String imageProfile;

    public Student(Long sid, String fullname, Short birthdayYear, String fullAddress, String zipcode, String status, String imageProfile, String email) {
        this.sid = sid;
        this.fullname = fullname;
        this.birthdayYear = birthdayYear;
        this.fullAddress = fullAddress;
        this.zipcode = zipcode;
        this.status = status;
        this.imageProfile = imageProfile;
        this.email = email;
    }

    public Student() {
    }

    public Long getSid() {
        return sid;
    }

    public void setSid(Long sid) {
        this.sid = sid;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public Short getBirthdayYear() {
        return birthdayYear;
    }

    public void setBirthdayYear(Short birthdayYear) {
        this.birthdayYear = birthdayYear;
    }

    public String getFullAddress() {
        return fullAddress;
    }

    public void setFullAddress(String fullAddress) {
        this.fullAddress = fullAddress;
    }

    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getImageProfile() {
        return imageProfile;
    }

    public void setImageProfile(String imageProfile) {
        this.imageProfile = imageProfile;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("Student{");
        sb.append("sid=").append(sid);
        sb.append(", fullname='").append(fullname).append('\'');
        sb.append(", birthdayYear=").append(birthdayYear);
        sb.append(", fullAddress='").append(fullAddress).append('\'');
        sb.append(", zipcode='").append(zipcode).append('\'');
        sb.append(", status='").append(status).append('\'');
        sb.append(", email='").append(email).append('\'');
        sb.append(", imageProfile='").append(imageProfile).append('\'');
        sb.append('}');
        return sb.toString();
    }
}
