interface category {
  id: string
  title: string
}

interface record {
  id: string
  purchaseDate: Date
  amountOfSales: number
}


interface product {
  id: string
  name: string
  price: number
  description: string
  img: string
  categories: category[]
  isAvailable: boolean
  sales: record[]
}

const dummyProducts: product[] = [
  {
    id: "prod1",
    name: "empanadas de jamon y queso epicos",
    price: 500,
    description: "empanadas de jamon y queso, riqui riqui",
    img: "https://www.cucinare.tv/wp-content/uploads/2021/09/Empanadas-fritas-o-al-horno.jpg",
    categories: [{
      id: "c-1",
      title: "Food"
    }, {
      id: "c-2",
      title: "Snacks"
    }
    ],
    isAvailable: true,
    sales: [
      {
        id: "VENTA HOY 1 ",
        purchaseDate: new Date("2023-06-25T15:30:00"),
        amountOfSales: 1,
      },
      {
        id: "VENTA HOY 1 ",
        purchaseDate: new Date("2023-06-25T15:31:00"),
        amountOfSales: 2,
      },
      {
        id: "VENTA HOY 1 ",
        purchaseDate: new Date("2023-06-25T15:32:00"),
        amountOfSales: 3,
      },
      {
        id: "VENTA HOY 1 ",
        purchaseDate: new Date("2023-06-25T15:33:00"),
        amountOfSales: 4,
      },
      {
        id: "VENTA HOY 1 ",
        purchaseDate: new Date("2023-06-25T15:30:00"),
        amountOfSales: 1,
      },
      
      {
        id: "VENTA HOY 2",
        purchaseDate: new Date("2023-06-25T10:30:00"),
        amountOfSales: 5,
      },
      {
        id: "VENTA ESTA SEMANA 1 ",
        purchaseDate: new Date("2023-06-27T15:30:00"),
        amountOfSales: 1,
      },
      {
        id: "VENTA ESTA SEMANA 2",
        purchaseDate: new Date("2023-06-27T10:30:00"),
        amountOfSales: 5,
      },
      {
        id: "VENTA ESTE MES 1 ",
        purchaseDate: new Date("2023-06-14T15:30:00"),
        amountOfSales: 1,
      },
      {
        id: "VENTA ESTE MES 2",
        purchaseDate: new Date("2023-06-10T10:30:00"),
        amountOfSales: 5,
      },
      {
        id: "VENTA MESES PASADO ",
        purchaseDate: new Date("2023-03-14T15:30:00"),
        amountOfSales: 1,
      },
      {
        id: "VENTA MESES PASADO",
        purchaseDate: new Date("2023-03-10T10:30:00"),
        amountOfSales: 5,
      }
      
    ]
  },
  {
    id: "prod2",
    name: "empanadas de carne bro",
    price: 500,
    description: "empanadas de carnoscaaa",
    img: "https://www.cucinare.tv/wp-content/uploads/2021/09/Empanadas-fritas-o-al-horno.jpg",
    categories: [{
      id: "c-1",
      title: "Food"
    }, {
      id: "c-2",
      title: "Snacks"
    }],
    isAvailable: true,
    sales: [
      {
        id: "s-1",
        purchaseDate: new Date("2023-03-19"),
        amountOfSales: 10,
      },
      {
        id: "s-2",
        purchaseDate: new Date("2023-03-21"),
        amountOfSales: 60,
      },
      {
        id: "s-3",
        purchaseDate: new Date("2023-03-22"),
        amountOfSales: 30,
      },
      {
        id: "s-4",
        purchaseDate: new Date("2023-03-23"),
        amountOfSales: 40,
      },
      {
        id: "s-1",
        purchaseDate: new Date("2023-03-19"),
        amountOfSales: 10,
      },
      {
        id: "s-2",
        purchaseDate: new Date("2023-03-21"),
        amountOfSales: 60,
      },
      {
        id: "s-3",
        purchaseDate: new Date("2023-03-22"),
        amountOfSales: 30,
      },
      {
        id: "s-4",
        purchaseDate: new Date("2023-03-23"),
        amountOfSales: 40,
      }
    ]
  },
  {
    id: "prod3",
    name: "pizza de muzza",
    price: 1600,
    description: "piza de muza, muy rica bro aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    img: "https://www.cucinare.tv/wp-content/uploads/2021/09/Empanadas-fritas-o-al-horno.jpg",
    categories: [{
      id: "c-1",
      title: "Food"
    }, {
      id: "c-2",
      title: "Snacks"
    }],
    isAvailable: true,
    sales: []
  },
  {
    id: "prod4",
    name: "hamburgesa con queso",
    price: 2500,
    description: "paty con queso bro",
    img: "https://www.cucinare.tv/wp-content/uploads/2021/09/Empanadas-fritas-o-al-horno.jpg",
    categories: [{
      id: "c-1",
      title: "Food"
    }, {
      id: "c-2",
      title: "Snacks"
    }],
    isAvailable: true,
    sales: []
  },
  {
    id: "prod5",
    name: "fideos con solo tuco",
    price: 1500,
    description: "fideos con SOLO TUCO >:(",
    img: "https://www.cucinare.tv/wp-content/uploads/2021/09/Empanadas-fritas-o-al-horno.jpg",
    categories: [{
      id: "c-1",
      title: "Food"
    }, {
      id: "c-2",
      title: "Snacks"
    }],
    isAvailable: true,
    sales: []
  },
  {
    id: "prod6",
    name: "agua",
    price: 100,
    description: "aguita refrescante :D",
    img: "https://www.cucinare.tv/wp-content/uploads/2021/09/Empanadas-fritas-o-al-horno.jpg",
    categories: [{
      id: "c-1",
      title: "Food"
    }, {
      id: "c-2",
      title: "Snacks"
    }],
    isAvailable: true,
    sales: []
  },
];

export { dummyProducts };