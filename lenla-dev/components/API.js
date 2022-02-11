const Domain = "http://localhost:3001";
import fetch from "isomorphic-unfetch";
import router from "next/router";
// let user = {};
export async function login(email, password, setUser) {
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
            [console.log("success login")];
            router.push("/create");
        } else {
            console.log(res.status);
        }
        const profile_data = await res.json();
        setUser({ ...profile_data, password });
        console.log("get profile done");
        window.localStorage.setItem(
            "user",
            JSON.stringify({ ...profile_data, password })
        );
    } catch (error) {
        // console.log(res);
        console.log(error);
    }
}
export async function saveDiagram(
    email,
    password,
    id,
    name,
    elements,
    publicVal
) {
    const res = await fetch(Domain + "/diagram/save/", {
        // mode: "no-cors",
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
            _id: id,
            name,
            elements,
            public: publicVal,
        }),
    });
    //
    if (res.status == 201) {
        [console.log("success")];
    } else {
        console.log(res.status);
    }
    // const profile_data = await res.json();
}
export async function createDiagram(
    email,
    password,
    name,
    elements,
    publicVal
) {
    const res = await fetch(Domain + "/diagram/create/", {
        // mode: "no-cors",
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
            name,
            elements,
            public: publicVal,
        }),
    });
    //
    if (res.status == 201) {
        [console.log("success")];
        const data = await res.json();
        console.log(data);
        return data._id;
    } else {
        console.log(res.status);
    }
    // const profile_data = await res.json();
}
export async function loadDiagramName(email, password) {
    // console.log(email, password)
    const res = await fetch(Domain + "/diagram/allDiagramName/", {
        // mode: "no-cors",
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
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
    } else {
        console.log(res.status);
    }
    return await res.json();
    // const profile_data = await res.json();
}
export async function loadDiagram(email, password, id) {
    const res = await fetch(Domain + "/diagram/findById/", {
        // mode: "no-cors",
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, id }),
    });
    //
    if (res.status == 201) {
        [console.log("success")];
        const data = await res.json();
        console.log("data: " + data);
        return data;
    } else {
        console.log(res.status);
    }
    // console.log(res);
    // // console.log("fuck1");

    // console.log(data);
    // console.log("fuck2");
}
export async function createBlog(
    email,
    password,
    name,
    pages,
    publicVal,
    public_date
) {
    const res = await fetch(Domain + "/blog/create/", {
        // mode: "no-cors",
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
            name,
            pages,
            public: publicVal,
            public_date,
        }),
    });
    //
    if (res.status == 201) {
        [console.log("success")];
        const data = await res.json();
        return data._id;
    } else {
        console.log(res.status);
    }
    // const profile_data = await res.json();
}
export async function saveBlog(
    email,
    password,
    _id,
    name,
    pages,
    publicVal,
    public_date
) {
    console.log(_id);
    const res = await fetch(Domain + "/blog/save/", {
        // mode: "no-cors",
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
            _id,
            name,
            pages,
            public: publicVal,
            public_date,
        }),
    });
    //
    if (res.status == 201) {
        [console.log("success")];
    } else {
        console.log(res.status);
    }
    // const profile_data = await res.json();
}
export async function getUserBySet(setUser) {
    const data = JSON.parse(window.localStorage.getItem("user"));
    // console.log(data);
    setUser(data);
}
