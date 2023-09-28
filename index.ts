import express, { Request, Response, response } from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

interface IBook {
    title: string;
    author: string;
    noOfPages: number;
}

interface IResponse {
    success: boolean;
    data: any;
    message?: string;
}

const books: IBook[] = [
    {
        title: "book 1",
        author: "furkan yalli",
        noOfPages: 75,
    },
    {
        title: "book 2",
        author: "deniz deliktas",
        noOfPages: 105,
    },
];

// Get all books
app.get('/books', function (req: Request, res: Response) {
    const response: IResponse = {
        success: true,
        data: books,
        message: "",
    };
    return res.status(200).json(response);
});

//Delete a book    --Furkan $ Deniz
app.delete('/books/:id', function (req: Request, res: Response) {
    const { id } = req.params;

    const bookIndex = books.findIndex((book: IBook, index: number) => index + 1 === parseInt(id));

        books.splice(bookIndex, 1);

        const response: IResponse = {
            success: true,
            data: null,
            message: "Book Deleted successfully",
        };

    return res.status(200).json(response);
});

// Get a book
app.get('/books/:id', function (req: Request, res: Response) {
    const { id } = req.params;

    const response: IResponse = {
        success: true,
        data: books.find((book: IBook, index: number) => index + 1 ===  parseInt(id)),
        message: "",
    };
    return res.status(200).json(response);
});

// Create a book
app.post('/books', function (req: Request, res: Response) {
    const { title, noOfPages, author } = req.body;

    const newBook: IBook = {
        title: title,
        noOfPages: noOfPages,
        author: author,
    };

    const existingBook: IBook | undefined = books.find((book: IBook) => book.title === newBook.title);
    if (!existingBook) {
        books.push(newBook);
        const response: IResponse = {
            success: true,
            data: null,
            message: "Created successfully",
        };
        return res.status(200).json(response);
    }

    const response: IResponse = {
        success: false,
        data: null,
        message: "Request failed",
    };
    return res.status(200).json(response);
});


app.listen(3000, () => console.log("Running at port 3000"))


// enum PaymentType {
//     Mastercard = "mastercard",
//     Visa = "visa",
//     Invalid = "invalid",
// };


// interface IPaymentPayload {
//     // required fields
// }

// interface IPaymentResponse {
//     success: boolean;
//     data: any;
//     message?: string;
// }

// interface IPaymentService {
//     pay(input: IPaymentPayload): Promise<IPaymentResponse>;
// }

// class MastercardService implements IPaymentService {
//     async pay(input: IPaymentPayload): Promise<IPaymentResponse> {

//         // implementation
//         console.log("mastercard", input);

//         return {
//             success: true,
//             data: input,
//             message: "Payed",
//         } as IPaymentResponse;
//     }
// }

// class VisaService implements IPaymentService {
//     async pay(input: IPaymentPayload): Promise<IPaymentResponse> {

//         // implementation
//         console.log("visa", input);

//         return {
//             success: true,
//             data: input,
//             message: "Payed",
//         } as IPaymentResponse;
//     }
// }



// ///
// const visa = new VisaService();
// const mc = new MastercardService();


// (async () => {
//     const input = {
//         type: PaymentType.Mastercard,
//         payload: {
//             // payment input object
//         } as IPaymentPayload,
//     };

//     switch (input.type) {
//         case PaymentType.Mastercard:
//             console.log(await mc.pay(input.payload));
//             break;
//         case PaymentType.Visa:
//             console.log(await visa.pay(input.payload));
//             break;
//         default:
//             console.log({
//                 success: false,
//                 data: null,
//                 message: "Payment type is invalid",
//             });
//     }
// })();










// interface IParentInterface {
//     surname: string;
//     print(): void;
// }


// class parentClass implements IParentInterface {
//     surname: string;

//     print(): void {
//         console.log("line");
//     }
// }

// class childClass extends parentClass {

// }

// const obj: parentClass = new parentClass();
// const child: childClass = new childClass();

// obj.print("parent");
// child.print("child")

// class myClass {
//     name: string;
//     surname: string;

//     constructor(name: string, surname: string) {
//         this.name = name;
//         this.surname = surname;
//         this.printName();
//     }

//     printName() {
//         console.log("name=" + this.name + "," + "surname=" + this.surname);
//     }
// };

// const myObject = new myClass("furkan", "yallı");
// const myObject2 = new myClass("gökalp", "öztürk");

// myObject.printName();