import { Search } from "lucide-react";
import { useState } from "react";
import Card from "../../../components/common/Card";
import { panelClass, sectionTitleClass } from "../constants";

const CustomerPayment = () => {
  const [query, setQuery] = useState("");
  const cards = [
    { id: "CARD-1", type: "Visa", number: "**** **** **** 4821", expiry: "09/28", status: "Primary" },
    { id: "CARD-2", type: "Mastercard", number: "**** **** **** 9182", expiry: "04/27", status: "Backup" },
  ];
  const filteredCards = cards.filter((card) =>
    `${card.type} ${card.number}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <h2 className={sectionTitleClass}>Payment</h2>
      <div className={panelClass}>
        <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          <Search className="h-4 w-4" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full bg-transparent outline-none"
            placeholder="Search saved cards"
          />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {filteredCards.map((card) => (
          <Card key={card.id}>
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">{card.type}</p>
            <p className="mt-3 text-lg font-semibold">{card.number}</p>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span>Expiry {card.expiry}</span>
              <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
                {card.status}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CustomerPayment;
