interface User {
    email: string;
    password: string;
}

const users: User[] = [
    { email: 'test@example.com', password: 'password123' },
];

export const login = (email: string, password: string): User | undefined => {
    return users.find(user => user.email === email && user.password === password);
};
