
export interface IUserInfo {
    "user": {
        "id": number,
        "email": string,
        "firstName": string,
        "lastName": string,
        "phone": any,
        "suspend": boolean,
        "isAgent": boolean,
        "createdAt": string,
        "updatedAt": string
    },
    "wallet": {
        "balance": number
    },
    "investments": {
        "total": number,
        "count": number
    },
    "pendingPayments": {
        "total": number,
        "count": number
    },
    "reservations": {
        "list": Array<any>,
        "count": number
    }
}

export interface IRole {
    "id": string,
    "permissions": string[],
    "name": string,
    "isActive": boolean,
    "createdAt": string,
    "updatedAt": string,
    "isDeleted": boolean,
    "deletedAt": string
}

export interface IUser {
    adminRole: {
        "id": string,
        "permissions": string[],
        "name": string,
        "isActive": boolean,
        "createdAt": string,
        "updatedAt": string,
        "isDeleted": false,
        "deletedAt": string
    },
    "id": number,
    "firstName": string,
    "lastName": string,
    "email": string,
    "phone": any,
    "password": string,
    "profilePicture": any,
    "roles": Array<any>,
    "type": string,
    "emailVerified": boolean,
    "addressVerified": boolean,
    "accountVerified": boolean,
    "paystackCode": string,
    "referralCode": string,
    "dob": any,
    position: string,
    "isAgent": boolean,
    "has2fa": boolean,
    "suspend": boolean,
    "createdAt": string,
    "updatedAt": string,
    "deleted": boolean,
    "deletedAt": any,
    "totalAmount": number,
    "reservations": number,
    "investments": number
    projects: Array<{
        "id": number,
        "userId": number,
        "profileId": number,
        "signed": boolean,
        "projectType": string,
        "buildingType": string,
        "projectAddress": string,
        "projectDescription": string,
        "proposedStartDate": string,
        "images": Array<string>,
        "duration": number,
        "furnishingType": string,
        "cement": string,
        "roofing": string,
        "flooring": string,
        "windows": string,
        "doors": string,
        "budget": number,
        "totalPayment": number,
        "paymentStructure": string,
        "status": string,
        "priority": string,
        "adminId": number,
        "agentId": null,
        "createdAt": string,
        "percentage": number,
        "updatedAt": string
    }>
}

export interface IAgent {
    "id": number,
    "firstName": string,
    "lastName": string,
    "email": string,
    "phone": string,
    "password": string,
    "profilePicture": string,
    "roles": Array<any>,
    "type": string,
    "emailVerified": boolean,
    "addressVerified": boolean,
    "accountVerified": boolean,
    "paystackCode": string,
    "referralCode": any,
    "dob": any,
    "isAgent": boolean,
    "has2fa": boolean,
    "suspend": boolean,
    "createdAt": string,
    "updatedAt": string,
    "deleted": boolean,
    "deletedAt": any,
    "statistics": {
        "totalProperties": number,
        "activeProperties": number,
        "soldProperties": number,
        "totalEarnings": number
    }
}