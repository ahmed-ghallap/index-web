// بسم الله

// groups[] of group
// group -> var students[], const date 
// student -> name, revesion, newPartToMeomrize 

// todo
// 1- display_students(date)
// 2- add&remove(student, date)
// 3- display_student_info(student-name, students)

// if ('serviceWorker' in navigator) {
//    navigator.serviceWorker.register('sw.js');
// }

// golbal variables
// const groups = get_objects_groups();
// const students = get_objects_students();

document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('.menu-toggle').onclick = function() {
        const el = document.querySelector('#settings');

        console.log(el.style.animationPlayState)
        
        this.classList.toggle('is-active');
        if (this.classList.length == 2) {
            // display it
            console.log('display setteings')
            el.style.animationPlayState = 'running'
        } else {
            // don't
            el.style.animationPlayState = 'paused'
            console.log('display home')
        }
    }


    message("مرحبا يا صدقي العزيز", 0);
    display_page('group');
    setup();

    // add student into database
    document.querySelector('#student-form').onsubmit = function() {
        create_student(this.name.value, this.age.value, this.phone.value);
        message('تم تسجيل الطالب بنجاح', 0);
        this.name.value = this.age.value = this.phone.value = '';
        return false;
    }
    // add group to database
    document.querySelector('#group-form').onsubmit = function() {
        if (create_group(this.name.value, this.day.value)) {
            message('تم انشاء المجموعة بنجاح ', 0);
        }
        this.name.value = this.day.value = '';
        return false;
    }

    // adding groups to the munu of groups
    document.querySelector('#group-list').onclick = function() {
        document.querySelector('#group-menu').innerHTML = '';
        groups = get_objects_groups();
        if (groups.length === 1) {
            message("انت لم تنشئ مجمعاتك بعد, \n انقر علي 'انشئ مجموعة'", 1)
        }
        groups.forEach(group => {
            if (group.id !== 0) {
                add_group_to_menu(group.id, group.name);
            }
        });
    }

    // add a studnet to a group
    document.querySelector('#add-student-form').onsubmit = function() {
        const groupId = parseInt(document.querySelector('#table-group').dataset.group);
        // const groupId = (document.querySelector('#table-group'));
        console.log(groupId)
        // return false;
        add_student_to_group(parseInt(this.student.value), groupId);
        message('تم اضافة الطالب بنجاح الي المجموعة', 0);
        display_group(groupId);
        return false;
    }


    // document.querySelector('#get-sura').onsubmit = function(form) {

    //     document.querySelector('#quran').innerHTML =
    //     get_chapter(this.sura.value, this.from.value, this.to.value).innerHTML;
    //     return false;
    // }

});
