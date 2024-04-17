import bcrypt from 'bcrypt';

// Random data generators
const randomName = () => {
    const firstNames = ["John", "Jane", "Chris", "Laura", "Mike", "Samantha", "James", "Jennifer", "Robert", "Linda"];
    const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor"];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${lastName}`;
};

const randomPhone = () => {
    return `${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`;
};

const randomEmail = (name, universityId) => {
    const domain = universityId === 1 ? "@ucf.edu" : "@harvard.edu";
    return `${name.split(' ')[0].toLowerCase()}.${name.split(' ')[1].toLowerCase()}${Math.floor(1 + Math.random() * 99)}${domain}`;
};

// Generate SQL statements
const generateUsers = async () => {
    const sqlStatements = [];
    for (let i = 0; i < 20; i++) {
        const name = randomName();
        const phone = randomPhone();
        const universityId = Math.random() > 0.5 ? 1 : 2;
        const email = randomEmail(name, universityId);
        const password = `password${i}`;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const sql = `INSERT INTO users (name, phone, email, university_id, password) VALUES ('${name}', '${phone}', '${email}', ${universityId}, '${hashedPassword}');`;
        sqlStatements.push(sql);
    }
    return sqlStatements;
};

// Example usage
generateUsers().then(sqlStatements => {
    sqlStatements.forEach(sql => console.log(sql));
});