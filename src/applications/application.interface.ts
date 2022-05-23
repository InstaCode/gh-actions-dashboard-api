export interface BaseApplication{
  name: string;
  id: number;
}

export interface Application extends BaseApplication {
  branchPrefix: string;
}
