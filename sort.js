let object1 = {
    "data": [
        { "name": "John", "email": "john2@mail.com" },
        { "name": "John", "email": "john1@mail.com" },
        { "name": "Jane", "email": "jane@mail.com" }
    ],
    "condition": { "include": [{ "name": "John" }], "sort_by": ["email"] }
}

let object2 = {
    "data": [
        { "user": "mike@mail.com", "rating": 20, "disabled": false },
        { "user": "greg@mail.com", "rating": 14, "disabled": false },
        { "user": "john@mail.com", "rating": 25, "disabled": true }
    ],
    "condition": { "exclude": [{ "disabled": true }], "sort_by": ["rating"] }

};

function filterUsers(object) {
    let users = [];
    let condition = object.condition;

    object.data.forEach(user => {
        let is_push = true;
        
        if (condition.include !== undefined) {
            is_push = false;
            condition.include.forEach(item => {
                let keys = Object.keys(item);
                let values = Object.values(item);
                if (is_push === false && user[keys[0]] === values[0]) {
                    is_push = true;
                }
            });
        }

        if (condition.exclude !== undefined) {
            is_push = true;
            condition.exclude.forEach(item => {
                let keys = Object.keys(item);
                let values = Object.values(item);
                if (is_push === true && user[keys[0]] === values[0]) {
                    is_push = false;
                }
            });
        }

        if (is_push) {
            users.push(user);
        }
    });

    if (condition.sort_by !== undefined) {
        condition.sort_by.forEach(item => {
            users = users.sort(byField(item));
        });
    }

    return JSON.stringify({ result: users });
}

function byField(field) {
    return (a, b) => a[field] > b[field] ? 1 : -1;
}

console.log(filterUsers(object1));
console.log(filterUsers(object2));