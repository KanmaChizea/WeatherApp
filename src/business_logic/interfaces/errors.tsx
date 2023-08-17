export class AppError {
    errorMessage :string;

    constructor(errorMessage?:string){
        this.errorMessage = errorMessage ?? 'Something went wrong!';
    }
}