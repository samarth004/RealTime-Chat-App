import { Client,Databases,Account} from 'appwrite';




export const client = new Client();
client
.setEndpoint("https://cloud.appwrite.io/v1")
.setProject('6710d3610028a8c47144');

export const account = new Account(client);
export const databases = new Databases(client);
