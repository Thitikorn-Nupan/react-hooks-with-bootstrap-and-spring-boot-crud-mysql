import {Student} from "../model/student.ts";

export class MockStudentService {

    private readonly students : Student[]

    constructor() {
        this.students = this.getDefaultStudents()
    }

    private getDefaultStudents() : Student[] {
        const students : Student[] = []
        for (let i = 0; i < 5; i++) {
            students.push({
                sid:i ,
                fullname : 'alex slider '+i,
                birthdayYear: 1999,
                email: "alex@gmail.com",
                fullAddress: "58/35 Soi Ladprao 107, Khlong Chan, Bangkapi",
                imageProfile: "https://img.icons8.com/?size=100&id=23238&format=png&color=000000",
                status: i != 4 ? "active" : "inactive",
                zipcode: "10150"
            })
        }
        return students
    }

    public getStudents() : Student[] {
        return this.students;
    }

}