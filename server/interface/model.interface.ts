interface IUser extends Document {
   username: string;
   user_id: number;
   email: string;
   products: Array<string>;
   warnings: number;
   banned: boolean;
   data_guild: Array<{
      username: string;
      user_id: number;
      sanctions: Array<string>;
      commands: Array<string>;
   }>;
}

export default IUser;