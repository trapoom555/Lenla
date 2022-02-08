const Domain = "http://localhost:3001";
import fetch from "isomorphic-unfetch";
import router from "next/router";
export async function login(email,password,setUser){
    
        try {
            const res = await fetch(Domain + "/log-in", {
                // mode: "no-cors",
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            //
            if (res.status == 200) {
                [console.log("success")];
                router.push("/create");
            }
            else{
                console.log(res.status)
            }
            const profile_data = await res.json();
            setUser({ ...profile_data,password });
            console.log("get profile done");
            // const img_res = await fetch(Domain + "/profileImg", {
            //     // mode: "no-cors",
            //     method: "POST",
            //     headers: {
            //         Accept: "application/json",
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({ email, password }),
            //     // body: JSON.stringify({ email, password }),
            // });
            // const img_data = await img_res.json();
            // setUser({ ...profile_data, profileImage: img_data.profileImg,password });
            // console.log(user);
            // console.log("get profileImg done");
        } catch (error) {
            // console.log(res);
            console.log(error);
        }
    
}
export async function saveDiagram(email,password,name,elements,publicVal){
    const res = await fetch(Domain + "/diagram/save/", {
        // mode: "no-cors",
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password,name,elements,public:publicVal }),
    });
    //
    if (res.status == 201) {
        [console.log("success")];
    }
    else{
        console.log(res.status)
    }
    // const profile_data = await res.json();
}

export async function loadDiagramName(email,password){
    // console.log(email, password)
    const res = await fetch(Domain + "/diagram/allDiagramName/", {
        // mode: "no-cors",
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password}),
        // body: JSON.stringify({
        //     name,
        //     elements:[],
        //         email,
        //     password
        // }),
    });
    //
    if (res.status == 201) {
        [console.log("success")];
    }
    else{
        console.log(res.status)
    }
    return await res.json()
    // const profile_data = await res.json();
}
export async function loadDiagram(email,password,name){
    const res = await fetch(Domain + "/diagram/findByName/", {
        // mode: "no-cors",
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password,name }),
    });
    //
    if (res.status == 201) {
        [console.log("success")];
    }
    else{
        console.log(res.status)
    }
    console.log(res)
    const data = await res.json();
    console.log(data)
    console.log("fuck2")
    return data;
}
