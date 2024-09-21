// بسم الله الرحمن الرحيم

/* ToDo
1. function message: Has some errors (err)
2. function create_group: Avoiding duplicate names (err)
3. function create_students: Avoiding duplicate names (err)
4. Week table of groups dateings (feature)  
5. Students pages (feature)
*/



function display_page(page) {
    document.querySelector('#createStudent-page').style.display = 'none';
    document.querySelector('#createGroup-page').style.display = 'none';
    document.querySelector('#group-page').style.display = 'none';

    document.querySelector(`#${page}-page`).style.display = 'block';
}


const daysList = [
    "السبت",
    "الاحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة"
];

// define standerd model.
const student_in_group_model = {
    id: 0,
    count: 0,
    now: [],
    per: []
}
const student_model = {
    id: 0,
    name: 'لا يوجد طلاب بعد',
    age: null,
    phone: null,
    groups: []
}
const group_model = {
    id: 0,
    name: "لا يوجد مجوعات بعد!",
    students: [student_in_group_model],
    day: null
}
const sura_now = {
    sura: 0,
    aya: "1:-, -:-, 20:40"
}

// define the structure of database
if (!localStorage.getItem("table-students")) {
    localStorage.setItem("table-students", JSON.stringify([student_model]));
}
if (!localStorage.getItem("table-groups")) {
    localStorage.setItem("table-groups", JSON.stringify([group_model]));
}
if (!localStorage.getItem("table-sura")) {
    localStorage.setItem("table-sura", '[]');
}
if (!localStorage.getItem('table-quran')) {
        
    fetch('https://api.alquran.cloud/v1/quran/quran-uthmani')
    .then(response => response.json())
    .then(results => {
        localStorage.setItem("table-quran", JSON.stringify(results.data.surahs));
    })
    .catch(error => {
        console.log('error loading quran fiailed');
    });
}

function setup() {
    create_suraDb();
    display_group(1);
    // creating the menu of groups 
    // groups = get_objects_groups();
    // groups.forEach(group => {
        // if (group.id === 0) return;
        // add_group_to_menu(group.id, group.name);
    // });
    // students.forEach(s => {
        // if (s.id === 0) return;
        // add_student_to_menu(s.id);
    // });
}
    
function create_student(name, age=null, phone=null) {
    // tested
    // create and save a student.
    // returns the student id.
    const Students = get_objects_students();
    const lastId = parseInt(Students.slice(-1)[0].id);
    const tmp = student_model;
    tmp.id = lastId+1;
    tmp.name = name;
    tmp.age = age,
    tmp.phone = phone;
    Students.push(tmp);
   
    save_objects_students(Students);
    return lastId+1;
}

function create_group(name, day) {
    // tested
    // Create a new group with empty array of students
    const groups = get_objects_groups();
    const oldId = parseInt(groups.slice(-1)[0].id);
    const tmp = group_model;
    tmp.name = name;
    tmp.day = day;
    tmp.id = oldId+1;
    groups.push(tmp);
   
    save_objects_groups(groups);
    add_group_to_menu(tmp.id, tmp.name);
    return true;
}


function create_suraDb() {
    var suras = get_objects_sura();
    if (suras.length >= 113) {
        console.log("suras are already there.")
        return;
    }
    fetch('https://api.quran.com/api/v4/chapters?language=ar')
    .then(response => response.json())
    .then(chapters => {
        console.log("start fetch suras from API");
        chapters.chapters.forEach(chapter => {
            suras.push({name: chapter.name_arabic, id: chapter.id});
        });

        save_objects_sura(suras);
        return;
        })
        .catch(error => {
            console.log("Error: getting suras from API failed");
            console.log(error);
            return;
        });
}


function add_student_to_group(studentId, groupId) {
    // tested
    // add a student to a group using its ids
    const s = get_student_by_id(studentId);
    const g = get_group_by_id(groupId);
    if (!s || !g) {
       console.log(`Error adding ${s} to ${g}, maybe wrong student id or group id`);
       return null;
    }

    
    for (let student of g.students) {
        if (student.id == s.id) {
            console.log(`Erro adding ${s.name} to ${g.name} because he is already exist.`)
            return null
        }
    }

    const tmp = student_in_group_model;
    tmp.id = s.id;
    tmp.count = 0;

    g.students.push(tmp); // add studetn to group.
    s.groups.push(g.id); // add group refrence to student.
   
    const groupsAll = get_objects_groups();
    groupsAll[g.id] = g; // to save into database
    const studentsAll = get_objects_students();
    studentsAll[s.id] = s; // to save into database
   
    save_objects_groups(groupsAll);
    save_objects_students(studentsAll);
    return g;
}


function save_objects_groups(groups) {
    localStorage.setItem("table-groups" ,JSON.stringify(groups))
}
function save_objects_students(students) {
    localStorage.setItem("table-students" ,JSON.stringify(students))
}
function save_objects_sura(sura) {
    localStorage.setItem('table-sura', JSON.stringify(sura));
}


function get_objects_students() {
    // tested 
    // returns array of studets
    return JSON.parse(localStorage.getItem('table-students'));
}
function get_objects_groups() {
    // tested 
    // return array of groups 
    return JSON.parse(localStorage.getItem('table-groups'));
}
function get_objects_sura() {
    // not tested yet
    // return array of suras
    return JSON.parse(localStorage.getItem('table-sura'));
}
function get_objects_quran() {
    return JSON.parse(localStorage.getItem('table-quran'));
}


function get_student_by_id(id) {
    // testd
    // return the student if found.
    // reutrn null if else.
    const students = JSON.parse(localStorage.getItem('table-students'));
    let student = null;
    students.forEach(function(s) {
        if (s.id == id) {
            student = s
            return ;
        }
    });
    
    return student;
}
function get_group_by_id(groupId) {
    // tested
    // return group if found, 
    // return null if not found
    let group =  null;
    JSON.parse(localStorage.getItem('table-groups'))
    .forEach(g => {
        if (g.id === groupId) {
            group = g;
            return;
        }
    });

    return group;
}
function get_sura_by_id(suraId) {
    // not tested
    // return sura object by sura number.
    return get_objects_sura().at(suraId-1);
}

function get_chapter(sura, from=1, to=0) {
    // tested
    // return div containes the sura
    // accepts spcific ayas period.
    const ayahs = get_objects_quran().at(sura-1).ayahs;
    const max = ayahs.length;
    if (to == 0 || to > max)
        to = max;
    const chapter = document.createElement('div');
    for (let i = Math.abs(from-1); i <= to-1; i++) {
        const span = document.createElement('span');
        span.innerHTML = ayahs[i].text + `(${i})`;
        chapter.append(span);
    }
    return chapter;
}


function register_count(studentId, groupId) {
    // tested
    // update student absense registeration count.
    // return studetn's group
    const g = get_group_by_id(groupId);
    g.students.forEach(student => {
        if (student.id == studentId) {
            student.count = parseInt(student.count)+1;
            const groupsAll = get_objects_groups();
            groupsAll[groupId] = g;
            save_objects_groups(groupsAll);
            console.log(`student absence registeration count is ${student.count}`)
            return;
        }
    });
    return g;
}

function edit_student(studentId, groupId, now=[], per=[]) {
    // tested 
    // returns group of edited student.
    const g = get_group_by_id(groupId);
    g.students.forEach(student => {
        if (student.id == studentId) {
            student.now = student.now.concat(now);
            student.per = student.per.concat(per);
            const groupsAll = get_objects_groups();
            groupsAll[groupId] = g;
            save_objects_groups(groupsAll);
            return;
        }
    });
    sura_now
    return g;
}


function message(m, state) {
    const tmp = document.querySelector('#message');
    tmp.innerText = m;
    if (state === 0) {
        // success
        tmp.classList.toggle('alert-success');
    } else if (state === 1) {
        // warring
        tmp.classList.toggle("alert-warning")
    } else {
        // danger
        tmp.classList.toggle("alert-danger")
    }
    tmp.classList.add('h4', 'alert', 'text-center');
    tmp.style.display = 'block';
    setTimeout( () => {
        tmp.style.display = 'none';
    }, 2000);
}


function add_group_to_menu(id, name) {
    // works
    const menu = document.querySelector('#group-menu');
    menu.innerHTML += `
            <li><button data-group="${id}" class="dropdown-item " onclick="console.log(); display_group(this.dataset.group); console.log(this)" >${name}</button></li>
    `;
};

function add_student_to_menu(id) {
    const s = get_student_by_id(id);
    const menu = document.querySelector('#student-menu');
    menu.innerHTML += `
            <option value="${s.id}">${s.name}</option>
    `
}

function get_students_in_group(groupId) {
    // works well
    const g = get_group_by_id(groupId);
    if (!g) return [];
    let students = [];
    g.students.forEach(s => {
        if (s.id === 0) return;
        students.push(get_student_by_id(s.id));
    });
    return students;
}


function get_students_not_in_group(groupId) {
    // to do
    let students = [];
    let invalidIds = [0];
    get_students_in_group(groupId).forEach(s => {
        invalidIds.push(s.id);
    });

    get_objects_students().forEach(value => {
        let pass = true;
        for (let id of invalidIds) {
            if (id === value.id) {
                console.log(id)
                pass = false;
                break;
            }
        }
        if (pass) {
            students.push(value)
        }
    });
    return students
}


function display_group(groupId) {
    const group = get_group_by_id(parseInt(groupId));

    let rows = '';
    let table = '';
    if (group) {
        group.students.forEach(s => {
            const student = get_student_by_id(s.id);
            if (student.id === 0) return;
            rows += `
                <tr id="${student.id}" class="student ">
                    <td class="table-info ">${student.name}</td>
                    <td>${s.count}</td>
                    <th scope="row"><button class="btn">✅</button><button class="btn">❌</button></th>
                </tr>
            ` 
        })

        table = `
        <h2 class="text-center m-3 text-success ">${group.name}</h2>
        <table class="table table-hover   text-center" id="group-table">
        <caption>${group.name}</caption>
            <thead>
                <tr class="table-primary ">
                    <th scope="col" class="table-secondary">اسم الطالب</th>
                    <th scope="col" class="table-primary">الحضور</th>
                    <th scope="col" class="table-primary"></th>
                </tr>
            </thead>
            <tbody>
                ${rows}       
            </tbody>
        </table>
        `
    } else {
        message("اضف طلاب جدد الي قاعدة البيانات", 1);
    }
    
    document.querySelector('#table-group').innerHTML = table;
    document.querySelector('#table-group').dataset.group = groupId;

    document.querySelector('#student-menu').innerHTML = '';
    get_students_not_in_group(parseInt(groupId)).forEach(s => {
        if (s.id === 0) return;
        add_student_to_menu(s.id);
    });
}


function display_settings(state) {
    const el = document.querySelector('#settings');
    if (state === 1) {
        // display it
        console.log('display setteings')
        el.style.animationPlayState = 'running'
        
    } else {
        // don't
        el.style.animationPlayState = 'paused'
        console.log('display home')
    }
}


function dayes() {
    const el = document.querySelector('#day');
    for (let i = 0; i < daysList.length; i++) {
        el.innerHTML += `<option value="${i}">${daysList[i]}</option>`;
    };
}