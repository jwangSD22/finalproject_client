import {faker} from '@faker-js/faker'
import axios from 'axios'
import config from '../helper/config.js'
import fs from 'fs'






let userArray = []

let server = `${config.backendServer}/api`

async function createRandomUser(map){

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
        //response.data.id will have the user's new id
        map.set(response.data.id,{id:response.data.id,username:username,password:password,fullName:fullName})

    }
    catch(err){
        console.log(err)
    }



}

const delay = (ms) => new Promise(resolve=> {setTimeout(resolve,ms);console.log(`delayed ${ms}ms`)})



let testCreate = async() => {

    let userMap = new Map()
    let posts = []
    let comments = []


    for(let i = 0 ;i<1;i++){
        await delay(500)
        await createRandomUser(userMap)


    }

    for(let [k,v] of userMap){
        let headers
        await delay(500)
        headers = await loginme(v.username,v.password)
        console.log(headers)
        await delay(500)
        await makePost(headers)


    }





    let convert = Object.fromEntries(userMap)
    let final = JSON.stringify(convert,undefined,4)

    fs.writeFile('./users.txt', final, (err) => {
        if (err) throw err;
        console.log('Results Received');
    })

    
}

await testCreate()





async function loginme(emailOrUsername,password){
    let headers = {}


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

 try{
    let postPhoto = await axios.get(`${config.backendServer}/api/seed/randomimg/post-photos`)


    let data = {
        'postMessage':'new test message 9/14',
        'imageKeyArray':[postPhoto.data]
    }

 



    
    let post = await axios.post(`${config.backendServer}/api/posts`,data,{headers})

    console.log(post.data)

 }
 catch(err){
    console.log(err)
 }

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





