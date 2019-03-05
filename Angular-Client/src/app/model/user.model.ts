export class User {
  constructor(
    public UserName: string,
    public Email: string,
    public Mobile: number,
    public Password: string,
    public Role: string
  ) {}
}

export const Roles = ['Admin', 'Operator', 'AccessUser'];
