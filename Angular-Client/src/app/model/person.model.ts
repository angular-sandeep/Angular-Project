export class Person {
  constructor(
    public PersonId: string,
    public FirstName: string,
    public MiddleName: string,
    public LastName: string,
    public Gender: string,
    public DateOfBirth: string,
    public Age: number,
    public FlatNumber: string,
    public SocietyName: string,
    public AreaName: string,
    public City: string,
    public State: string,
    public Pincode: number,
    public PhoneNo: number,
    public MobileNo: number,
    public PhysicalDisability: string,
    public MaritalStatus: string,
    public Education: string,
    public BirthSign: string,
    public CreatedBy: number
  ) {}
}

export const Gender = ["Male", "Female", "Transgender"];

export const MaritalStatus = [
  "Married",
  "Unmarried",
  "Divorced",
  "Widow",
  "Widower"
];

export const Education = [
  "PhD",
  "Post-Graduate",
  "Under-Graduate",
  "HSC",
  "SSC",
  "Illiterate"
];
