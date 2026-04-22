export class FormatDateImage {
    public generateDate(imageName: string) {
        const date = new Date();
        const categoryImage = imageName.split(".");
        return categoryImage[0] + date.getFullYear() + date.getMonth() + date.getDay() + date.getHours() + '.' + categoryImage[1];
    }
}