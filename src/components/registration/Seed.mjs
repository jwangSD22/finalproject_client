import {faker} from '@faker-js/faker'
import axios from 'axios'
import config from '../../helper/config.js'
import Compressor from 'compressorjs'




let userArray = []

let server = `${config.backendServer}/api`

async function createRandomUser(){

    let fullName,username,password,email,dob

    fullName = faker.person.fullName()
    username = faker.internet.userName()
    password = faker.internet.password({ length: 20 })
    email = faker.internet.email() 
    dob = faker.date.birthdate()


    let formData = {
        fullName: fullName,
        username: username,
        password: password,
        email: email,
        dateOfBirth: dob,
      };

    try{
        let response = await axios.post(`${config.backendServer}/api/users`, formData)
        console.log(response)
    }
    catch(err){
        console.log(err)
    }



}


// for(let i = 0 ;i<10;i++){
//     createRandomUser()
// }





async function loginme(emailOrUsername,password){
    let headers = {}

    emailOrUsername = 'monster'
    password = 'woofwoof'

    let response = await axios.post(`${config.backendServer}/api/users/login`,{emailOrUsername,password})

    headers['Authorization'] = `Bearer ${response.data.token}`,
    headers['user'] = {
        'jwtid':response.data.jwtid,
        'jwtusername':response.data.jwtusername,
        'jwtemail':response.data.jwtemail
    }


    return headers

}








async function makePost(headers) {
    let data = {
        'postMessage':'new test message 9/12'
    }

    
    let post = await axios.post(`${config.backendServer}/api/posts`,data,{headers})

    console.log(post.data)

    //post data holds the id of the post

}



async function likePost(id){

    let response = await axios.put(`${server}/posts/${id}/togglelike`,null,{headers})

    console.log(response.data)

    let data = {
        message:'nice post'
    }


    let comment = await axios.post(`${server}/posts/${id}/newcomment`,data,{headers})
    console.log(comment.data)

    //gets the ID for the comment  
    let commentID = comment.data


    let likeComment = await axios.put(`${server}/comments/${commentID}/togglelike`,null,{headers})


}

async function loginandcheck() {

    

    let headers = await loginme()

    await makePost(headers)
    // await makePost()



}



loginandcheck()

//create 10 users.. i need all of their login info, username/passwords..
// 64ff9e75e93ded9445114d78


