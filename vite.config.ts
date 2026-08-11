import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // define: {
    //     'process.env': {
    //         BASE_URL: ['http://localhost:8080/api/student', 'http://localhost:8080/api/students']
    //     }, // Defines process.env as an empty object
    // },
    define: {
        // # optional way it needs to install libs --save-dev globals@15.9.0, npm i --save-dev @types/node
        // B:\practice-java-one-jetbrains\learn-spring-boot-and-spring-beans\spring-boot-crud-for-react-hooks-and-formik
        // we have to set key : value for call by process.env.<key>
        // ***
        // 'process.env.BASE_URL': JSON.stringify('http://localhost:8080/api/student'),
        // Or
        'process.env': {
            BASE_URL: ['http://localhost:8080/api/student', 'http://localhost:8080/api/students']
        }, // Defines process.env as an empty object
    },
})
