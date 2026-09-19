import CategoryCard from "./CategoriesCard";

const data = [
  {
    title: "Appliances for your home | Up to 55% off",
    linkText: "See more",
    items: [
      {
        name: "Air conditioners",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
      },
      {
        name: "Refrigerators",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
      },
      {
        name: "Microwaves",
        image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078",
      },
      {
        name: "Washing machines",
        image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c",
      },
    ],
  },
   {
    title: "Appliances for your home | Up to 55% off",
    linkText: "See more",
    items: [
      {
        name: "Air conditioners",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
      },
      {
        name: "Refrigerators",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
      },
      {
        name: "Microwaves",
        image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078",
      },
      {
        name: "Washing machines",
        image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c",
      },
    ],
  },
   {
    title: "Appliances for your home | Up to 55% off",
    linkText: "See more",
    items: [
      {
        name: "Air conditioners",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
      },
      {
        name: "Refrigerators",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
      },
      {
        name: "Microwaves",
        image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078",
      },
      {
        name: "Washing machines",
        image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c",
      },
    ],
  },
   {
    title: "Appliances for your home | Up to 55% off",
    linkText: "See more",
    items: [
      {
        name: "Air conditioners",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
      },
      {
        name: "Refrigerators",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
      },
      {
        name: "Microwaves",
        image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078",
      },
      {
        name: "Washing machines",
        image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c",
      },
    ],
  },
];

export default function CategorySection() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {data.map((card, i) => (
        <CategoryCard key={i} {...card} />
      ))}
    </div>
  );
}