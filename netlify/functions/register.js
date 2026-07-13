/* ==========================================================
   CULTURE ROLEPLAY
   REGISTER.JS
========================================================== */

"use strict";

/* ==========================================================
   DOM
========================================================== */

const form = document.getElementById("registerForm");

const submitBtn = document.getElementById("submitBtn");

const progressBar = document.getElementById("progressBar");

const pageLoader = document.getElementById("pageLoader");

const scrollTopBtn = document.getElementById("scrollTopBtn");

const reason = document.getElementById("reason");

const motivation = document.getElementById("motivation");

const reasonCounter = document.getElementById("reasonCounter");

const motivationCounter = document.getElementById("motivationCounter");

const everAdmin = document.getElementById("ever_admin");

const serverName = document.getElementById("server_name");

const adminPosition = document.getElementById("admin_position");

/* ==========================================================
   INIT
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    hideLoader();

    initScrollButton();

    initRevealAnimation();

    initCharacterCounter();

    initProgressBar();

    initAdminFields();

});

/* ==========================================================
   LOADER
========================================================== */

function hideLoader(){

    if(!pageLoader) return;

    setTimeout(()=>{

        pageLoader.classList.add("hide");

    },600);

}

/* ==========================================================
   SCROLL TOP
========================================================== */

function initScrollButton(){

    if(!scrollTopBtn) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY>300){

            scrollTopBtn.classList.add("show");

        }else{

            scrollTopBtn.classList.remove("show");

        }

    });

    scrollTopBtn.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/* ==========================================================
   REVEAL ANIMATION
========================================================== */

function initRevealAnimation(){

    const elements=document.querySelectorAll(".reveal");

    if(!elements.length) return;

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("active");

            }

        });

    },{

        threshold:.15

    });

    elements.forEach(el=>observer.observe(el));

}

/* ==========================================================
   DATE FORMAT
========================================================== */

function formatDate(){

    return new Date().toLocaleString("id-ID",{

        dateStyle:"full",

        timeStyle:"short"

    });

}

/* ==========================================================
   HELPER
========================================================== */

function $(selector){

    return document.querySelector(selector);

}

function $all(selector){

    return document.querySelectorAll(selector);

}

/* ==========================================================
   CHARACTER COUNTER
========================================================== */

function initCharacterCounter(){

    setupCounter(reason, reasonCounter);

    setupCounter(motivation, motivationCounter);

}

function setupCounter(input, counter){

    if(!input || !counter) return;

    updateCounter(input, counter);

    input.addEventListener("input",()=>{

        updateCounter(input, counter);

        autoResize(input);

        updateProgress();

    });

}

function updateCounter(input, counter){

    counter.textContent=`${input.value.length} / ${input.maxLength}`;

}

/* ==========================================================
   AUTO RESIZE TEXTAREA
========================================================== */

function autoResize(textarea){

    if(!textarea) return;

    textarea.style.height="auto";

    textarea.style.height=textarea.scrollHeight+"px";

}

/* ==========================================================
   PROGRESS BAR
========================================================== */

function initProgressBar(){

    if(!form) return;

    const fields=form.querySelectorAll(

        "input, select, textarea"

    );

    fields.forEach(field=>{

        field.addEventListener("input",updateProgress);

        field.addEventListener("change",updateProgress);

    });

    updateProgress();

}

function updateProgress(){

    if(!form || !progressBar) return;

    const fields=form.querySelectorAll(

        "input, select, textarea"

    );

    let total=0;

    let filled=0;

    fields.forEach(field=>{

        if(

            field.type==="hidden" ||

            field.disabled

        ){

            return;

        }

        total++;

        if(field.type==="checkbox"){

            if(field.checked){

                filled++;

            }

        }

        else{

            if(field.value.trim()!==""){

                filled++;

            }

        }

    });

    const percent=

        total===0

        ? 0

        : Math.round(

            (filled/total)*100

        );

    progressBar.style.width=

        percent+"%";

    const progressText=

        document.getElementById("progressText");

    if(progressText){

        progressText.textContent=

            percent+"%";

    }

}

/* ==========================================================
   ADMIN EXPERIENCE
========================================================== */

function initAdminFields(){

    if(!everAdmin) return;

    toggleAdminFields();

    everAdmin.addEventListener(

        "change",

        toggleAdminFields

    );

}

function toggleAdminFields(){

    const show=

        everAdmin.value==="Ya";

    if(serverName){

        serverName.closest(".form-group").style.display=

            show

            ? "flex"

            : "none";

    }

    if(adminPosition){

        adminPosition.closest(".form-group").style.display=

            show

            ? "flex"

            : "none";

    }

    if(!show){

        if(serverName) serverName.value="";

        if(adminPosition) adminPosition.value="";

    }

    updateProgress();

}

/* ==========================================================
   VALIDATION
========================================================== */

function validateForm(){

    if(!form) return false;

    const requiredFields = form.querySelectorAll(

        "input[required], select[required], textarea[required]"

    );

    let valid = true;

    requiredFields.forEach(field=>{

        field.classList.remove("input-error");

        if(field.offsetParent === null) return;

        if(field.value.trim()===""){

            field.classList.add("input-error");

            valid = false;

        }

    });

    const rpExperience = document.querySelectorAll(

        'input[name="rp_experience"]:checked'

    );

    if(rpExperience.length===0){

        showToast(

            "Pilih minimal satu pengalaman Roleplay.",

            "warning"

        );

        valid = false;

    }

    if(!valid){

        showToast(

            "Harap lengkapi semua data yang wajib diisi.",

            "error"

        );

    }

    return valid;

}

/* ==========================================================
   GET FORM DATA
========================================================== */

function getFormData(){

    return{

        fullname:

            $("#fullname")?.value.trim() || "",

        nickname:

            $("#nickname")?.value.trim() || "",

        age:

            $("#age")?.value.trim() || "",

        activity:

            $("#activity")?.value.trim() || "",

        active_time:

            $("#active_time")?.value.trim() || "",

        ever_admin:

            $("#ever_admin")?.value || "",

        server_name:

            $("#server_name")?.value.trim() || "",

        admin_position:

            $("#admin_position")?.value.trim() || "",

        play_time:

            $("#play_time")?.value || "",

        city_time:

            $("#city_time")?.value || "",

        reason:

            $("#reason")?.value.trim() || "",

        motivation:

            $("#motivation")?.value.trim() || "",

        rp_experience:

            [...document.querySelectorAll(

                'input[name="rp_experience"]:checked'

            )].map(el=>el.value)

    };

}

/* ==========================================================
   DISCORD PAYLOAD
========================================================== */

function buildDiscordPayload(data){

    return{

        username:"Culture Recruitment",

        avatar_url:"",

        embeds:[

            {

                title:"📨 ADMIN RECRUITMENT",

                color:0xD4AF37,

                description:

                    "Pendaftaran Admin baru telah diterima.",

                fields:[

                    {

                        name:"👤 Informasi OOC",

                        value:

`**Nama :** ${data.fullname}

**Nickname :** ${data.nickname}

**Umur :** ${data.age}

**Kesibukan :** ${data.activity}

**Jam Aktif :** ${data.active_time}`,

                        inline:false

                    },

                    {

                        name:"🎮 Pengalaman RP",

                        value:

data.rp_experience.length

? data.rp_experience.join(", ")

: "-",

                        inline:false

                    },

                    {

                        name:"🛡 Pengalaman Admin",

                        value:

`**Pernah :** ${data.ever_admin}

**Server :** ${data.server_name || "-"}

**Posisi :** ${data.admin_position || "-"}`,

                        inline:false

                    },

                    {

                        name:"⏳ Lama Bermain",

                        value:

`**Roleplay :** ${data.play_time}

**Culture RP :** ${data.city_time}`,

                        inline:false

                    },

                    {

                        name:"📝 Alasan Menjadi Admin",

                        value:data.reason,

                        inline:false

                    },

                    {

                        name:"🚀 Motivasi",

                        value:data.motivation,

                        inline:false

                    },

                    {

                        name:"📅 Submit",

                        value:formatDate(),

                        inline:false

                    }

                ],

                footer:{

                    text:"Culture Roleplay Recruitment"

                },

                timestamp:new Date().toISOString()

            }

        ]

    };

}

/* ==========================================================
   LOADING BUTTON
========================================================== */

function setLoading(state){

    if(!submitBtn) return;

    if(state){

        submitBtn.disabled = true;

        submitBtn.classList.add("loading");

    }else{

        submitBtn.disabled = false;

        submitBtn.classList.remove("loading");

    }

}

/* ==========================================================
   TOAST NOTIFICATION
========================================================== */

function showToast(message,type="success"){

    let toast = document.getElementById("toast");

    if(!toast){

        toast = document.createElement("div");

        toast.id = "toast";

        toast.className = "toast";

        document.body.appendChild(toast);

    }

    toast.className = `toast ${type} show`;

    toast.innerHTML = message;

    clearTimeout(toast.timer);

    toast.timer = setTimeout(()=>{

        toast.classList.remove("show");

    },4000);

}

/* ==========================================================
   SEND TO NETLIFY FUNCTION
========================================================== */

async function sendApplication(data){

    const payload = buildDiscordPayload(data);

    const response = await fetch(

        "/.netlify/functions/register",

        {

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(payload)

        }

    );

    if(!response.ok){

        throw new Error(

            "Gagal menghubungi server."

        );

    }

    if(response.status===204){

        return{

            success:true

        };

    }

    return await response.json();

}

/* ==========================================================
   RESET FORM
========================================================== */

function resetApplication(){

    if(!form) return;

    form.reset();

    toggleAdminFields();

    updateProgress();

    updateCounter(reason,reasonCounter);

    updateCounter(motivation,motivationCounter);

    autoResize(reason);

    autoResize(motivation);

}

/* ==========================================================
   HANDLE ERROR
========================================================== */

function handleSubmitError(error){

    console.error(error);

    showToast(

        error.message ||

        "Terjadi kesalahan saat mengirim data.",

        "error"

    );

}

/* ==========================================================
   SUBMIT FORM
========================================================== */

if(form){

    form.addEventListener("submit", async function(e){

        e.preventDefault();

        if(!validateForm()){

            return;

        }

        const data = getFormData();

        try{

            setLoading(true);

            const result = await sendApplication(data);

            if(result.success){

                showToast(

                    "✅ Pendaftaran berhasil dikirim!",

                    "success"

                );

                resetApplication();

                window.scrollTo({

                    top:0,

                    behavior:"smooth"

                });

            }else{

                throw new Error(

                    result.message ||

                    "Gagal mengirim data."

                );

            }

        }catch(error){

            handleSubmitError(error);

        }finally{

            setLoading(false);

        }

    });

}

/* ==========================================================
   REMOVE INPUT ERROR
========================================================== */

if(form){

    form.querySelectorAll(

        "input, select, textarea"

    ).forEach(field=>{

        field.addEventListener("input",()=>{

            field.classList.remove(

                "input-error"

            );

        });

        field.addEventListener("change",()=>{

            field.classList.remove(

                "input-error"

            );

        });

    });

}

/* ==========================================================
   INITIAL PROGRESS
========================================================== */

window.addEventListener("load",()=>{

    updateProgress();

});