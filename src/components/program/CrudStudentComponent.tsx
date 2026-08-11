import styles from '../../Table.module.css';
import {Student} from "../../model/student.ts";
import {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import axios from "axios";

export function CrudStudentComponent(): JSX.Element {
    const studentDefaultValue: Student = {
        birthdayYear: 0,
        email: "",
        fullAddress: "",
        fullname: "",
        imageProfile: "",
        sid: 0,
        status: "",
        zipcode: ""
    }
    const [students, setStudents] = useState<Student[]>();
    const [student, setStudent] = useState<Student>(studentDefaultValue);
    const [mode, setMode] = useState<{ mode: 'update' | 'insert' | 'delete' }>();
    const [studentHeader, setStudentHeader] = useState<string[]>()
    //const [defaultBaseUrl] = useState<string>(import.meta.env.VITE_BASE_URL2);
    const [defaultBaseUrl] = useState<string | string[] | undefined>(process.env.BASE_URL); // http://localhost:8080/api/student,http://localhost:8080/api/students
    let imageProfile: File | null = null
    let birthdayYear: Date | null = null

    useEffect(() => {
        loadStudents().then(() => console.log('loaded students'))
    }, [mode])

    async function loadStudents(): Promise<void> {
        // console.log(import.meta.env.VITE_BASE_URL1) // can't be array env as VITE_BASE_URL[0]
        await axios.get(defaultBaseUrl![0] + '/selectAll').then(async (response: any) => {
            const responseData = response.data;
            if (responseData.status == 200) {
                const students = responseData.data;
                // optional
                students.forEach((student: any) => {
                    student.imageProfile = student.imageProfile.replace('B:\\practice-nodejs-php-typescript-angular\\applications\\Project-React\\lab-react-hooks-and-formik-for-spring-boot-crud\\src\\assets\\images\\', 'src/assets/images/');
                })
                setStudents(students);
                setStudentHeader(Object.keys(responseData.data[0]))
            }
        }).catch(error => {
            throw error
        });
    }

    // ** when you use to on<Event>={} you can do custom parameters by onSetDefaultUpdateStudent.bind(null,<custom param 1>,<custom param 2> ,...)
    function onSetDefaultUpdateStudent(student: Student, event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        event && setStudent(student)
    }

    async function onDeleteStudent(sid: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
        if (event) {
            await axios.delete(defaultBaseUrl![0] + '/deleteOne/' + sid).then(async (response: any) => {
                const responseData = response.data;
                if (responseData.status == 202) {
                    setMode({mode: 'delete'})
                }
            }).catch(error => {
                throw error
            });
        }
    }

    function StudentHeaderComponent(): JSX.Element {
        return (
            <tr className={"table table-secondary"}>
                {
                    studentHeader && studentHeader.length > 0 && studentHeader.map((header: string, index: number) => (
                        <th key={index}
                            className={styles.tableHeader}
                            scope="col">
                            {header.toUpperCase()}
                        </th>
                    ))
                }
                <th scope="col" className={styles.tableHeader}>{'option'.toUpperCase()}</th>
            </tr>
        )
    }

    function StudentRowComponent({student, index}: { student: any | Student, index: number }): JSX.Element {
        return (
            <tr key={index}>
                {
                    studentHeader && studentHeader.length > 0 && studentHeader.map((header: string) => (
                        (header != 'imageProfile') ?
                            (<td key={student[header]}>{student[header]}</td>) :
                            (<td key={student[header]}>
                                {student[header] != null ?
                                    <img src={student[header]} width={40} height={40} alt={"..."}/> : ''}
                            </td>)
                    ))
                }
                <td>
                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                        {/*
                            The first argument to bind (null here) sets 'this'.
                            The following arguments are custom params.
                            The event is automatically passed last.
                        */}
                        <button type="button"
                                className="btn btn-secondary"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                disabled={student.sid <= 8}
                                onClick={onSetDefaultUpdateStudent.bind(null, student)}>
                            update
                        </button>
                        <button type="button"
                                className="btn btn-secondary"
                                disabled={student.sid <= 8}
                                onClick={onDeleteStudent.bind(null, student.sid)}>
                            delete
                        </button>
                    </div>
                </td>
            </tr>
        )
    }

    function StudentFormCreateComponent(): JSX.Element {
        const onSubmit = async (student: Student) => {
            const formData: FormData = new FormData();
            student.birthdayYear = new Date(student.birthdayYear).getFullYear()
            // set student as json type is importance because it's application/octet-stream type
            formData.append('student', new Blob([JSON.stringify(student)], {type: 'application/json'}))
            formData.append('file', imageProfile!)
            await axios.post(defaultBaseUrl![0] + '/insertOne', formData).then(async (response: any) => {
                const responseData = response.data;
                if (responseData.status == 201) {
                    setMode({mode: 'insert'})
                }
            }).catch(error => {
                throw error
            });
        }

        const onReset = () => {
            setStudent(studentDefaultValue)
        }

        return (
            <div className={"container w-50"}>
                <h5 className={"mb-4"}>Form Create Student</h5>
                {/* <Formik> is a component that helps you with building forms. It uses a render props pattern made popular by libraries like React Motion and React Router. */}
                <Formik
                    initialValues={studentDefaultValue} // initialValues for binding the object of form
                    onSubmit={onSubmit}
                    onReset={onReset}>
                    {/*
                        Form is a small wrapper around an HTML <form> element that automatically hooks into Formik's handleSubmit and handleReset.
                        All other props are passed directly through to the DOM node.
                    */}
                    <Form>
                        {/*
                            <Field /> will automagically hook up inputs to Formik. It uses the name attribute to match up with Formik state.
                            <Field /> will default to an HTML <input /> element. Rendering
                        */}
                        <div className="input-group mb-3">
                            <span className="input-group-text">Fullname</span>
                            <Field type="text"
                                   name="fullname"
                                   className="form-control"
                                   placeholder="Fullname..."
                                   required/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Email</span>
                            <Field type="email"
                                   name="email"
                                   className="form-control"
                                   placeholder="Email..."
                                   required/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Birthday</span>
                            <Field type="date"
                                   name="birthdayYear"
                                   className="form-control"
                                   required/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Address</span>
                            <Field type="text"
                                   name="fullAddress"
                                   className="form-control"
                                   placeholder="Address..."
                                   required/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Zipcode</span>
                            <Field type="text"
                                   name="zipcode"
                                   className="form-control"
                                   pattern="[0-9]*"
                                   maxLength="5"
                                   minLength="5"
                                   inputMode="numeric"
                                   onInvalid={(event: any) => {
                                       event.target.setCustomValidity("Invalid zipcode");
                                   }}
                                   onInput={(event: any) => {
                                       event.target.setCustomValidity("");
                                   }}
                                   placeholder="Zipcode..."
                                   required/>
                        </div>
                        <div className="input-group mb-3">
                            <label className="input-group-text">Profile</label>
                            <input type="file"
                                   onChange={(event: any) => {
                                       // ** Bug when upload update state file
                                       // setReqFormData(prevState => ({
                                       //     ...prevState,
                                       //     file: event.target.files[0]
                                       // }))
                                       imageProfile = event.target.files[0]
                                   }}
                                   className="form-control"
                                   required/>
                        </div>
                        <div className="input-group mb-3">
                            Status
                            <div className="form-check ms-2">
                                <Field className="form-check-input"
                                       type="radio"
                                       name="status"
                                       value="active"
                                       required/>
                                <label className="form-check-label">
                                    Active
                                </label>
                            </div>
                            <div className="form-check ms-2">
                                <Field className="form-check-input"
                                       type="radio"
                                       name="status"
                                       value="inactive"
                                       required/>
                                <label className="form-check-label">
                                    Inactive
                                </label>
                            </div>
                        </div>
                        <div className={"btn-group mb-4"}>
                            <button type="submit" className="btn btn-secondary">Create</button>
                            <button type="reset" className="btn btn-secondary">Reset</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        )
    }

    function StudentFormUpdateComponent({student}: { student: Student }): JSX.Element {
        const onSubmit = async (student: Student) => {
            const formData: FormData = new FormData();
            student.birthdayYear = birthdayYear?.getFullYear()!
            formData.append('student', new Blob([JSON.stringify(student)], {type: 'application/json'}))
            formData.append('file', imageProfile!)
            await axios.put(defaultBaseUrl![0] + '/updateOne', formData).then(async (response: any) => {
                const responseData = response.data;
                if (responseData.status == 202) {
                    setMode({mode: 'update'})
                }
            }).catch(error => {
                throw error
            });
        }

        const onReset = (): void => {
            setStudent(student)
            setStudent(prevState => ({
                ...prevState,
                imageProfile: ''
            }))
        }

        return (
            <div className={"container w-100"}>
                <Formik
                    initialValues={student} // initialValues for binding the object of form
                    onSubmit={onSubmit}
                    onReset={onReset}>
                    <Form>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Fullname</span>
                            <Field type="text"
                                   name="fullname"
                                   className="form-control"
                                   placeholder="Fullname..."
                                   required/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Email</span>
                            <Field type="email"
                                   name="email"
                                   className="form-control"
                                   placeholder="Email..."
                                   required/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Birthday</span>
                            <input type="date"
                                   name="birthdayYear"
                                   onChange={(event: any) => {
                                       birthdayYear = new Date(event.target.value);
                                   }}
                                   className="form-control"
                                   required/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Address</span>
                            <Field type="text"
                                   name="fullAddress"
                                   className="form-control"
                                   placeholder="Address..."
                                   required/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Zipcode</span>
                            <Field type="text"
                                   name="zipcode"
                                   className="form-control"
                                   pattern="[0-9]*"
                                   maxLength="5"
                                   minLength="5"
                                   inputMode="numeric"
                                   onInvalid={(event: any) => event.target.setCustomValidity("Invalid zipcode")}
                                   onInput={(event: any) => event.target.setCustomValidity("")}
                                   placeholder="Zipcode..."
                                   required/>
                        </div>
                        <div className="input-group mb-3">
                            <label className="input-group-text">Profile</label>
                            <input type="file"
                                   onChange={(event: any) => {
                                       imageProfile = event.target.files[0];
                                   }}
                                   className="form-control"
                            />
                        </div>
                        <div className="input-group mb-3">
                            Status
                            <div className="form-check ms-2">
                                <Field className="form-check-input"
                                       type="radio"
                                       name="status"
                                       value="active"
                                       required/>
                                <label className="form-check-label">
                                    Active
                                </label>
                            </div>
                            <div className="form-check ms-2">
                                <Field className="form-check-input"
                                       type="radio"
                                       name="status"
                                       value="inactive"
                                       required/>
                                <label className="form-check-label">
                                    Inactive
                                </label>
                            </div>
                        </div>
                        <div className={"btn-group mb-4"}>
                            <button type="submit" className="btn btn-secondary">Update</button>
                            <button type="reset" className="btn btn-secondary">Reset</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        )
    }

    return (
        <div className="card w-75 mx-auto mt-4">
            <div className="card-header">Program Crud Student With API</div>
            <div className="card-body">
                <table className="table">
                    <thead>
                        {<StudentHeaderComponent/>}
                    </thead>
                    <tbody>
                        {
                         (students && students.length > 0) && students.map((student: Student, index: number) => (<StudentRowComponent student={student} index={index} key={index}/>))
                        }
                    </tbody>
                </table>
            </div>
            {/* Form insert */}
            <StudentFormCreateComponent/>
            {/* Form update */}
            <div className="modal fade"
                 id="exampleModal"
                 tabIndex={-1}
                 aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"
                                id="exampleModalLabel">
                                Form Update Student Id {student?.sid}
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <StudentFormUpdateComponent student={student}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}