import Card from "../../components/common/Card";
import PageTransition from "../../components/common/PageTransition";
import { useApp } from "../../context/AppContext";

const AboutPage = () => {
  const { team } = useApp();

  return (
    <PageTransition className="space-y-8">
      <section className="glass rounded-3xl p-8">
        <h1 className="font-display text-3xl font-bold">About E-Commerces</h1>
        <p className="mt-4 max-w-3xl text-slate-600 dark:text-slate-300">
          E-Commerces is a modern multi-vendor commerce experience designed for teams that
          care about premium UX and scalable operations. We combine beautiful storefront
          journeys with robust dashboards for admins, vendors, and customers.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold">Leadership Team</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <Card key={member.id} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary-900 text-lg font-bold text-white dark:bg-primary-500 dark:text-white">
                {member.image}
              </div>
              <h3 className="mt-3 font-display text-xl font-semibold">{member.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-300">{member.title}</p>
            </Card>
          ))}
        </div>
      </section>
    </PageTransition>
  );
};

export default AboutPage;
