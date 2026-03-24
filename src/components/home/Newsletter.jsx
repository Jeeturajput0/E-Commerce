import { motion } from "framer-motion";
import { Send } from "lucide-react";
export default function Newsletter() {
    return (<section className="gradient-primary">
      <div className="container-custom py-10 md:py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-heading font-bold text-primary-foreground">
              Sign Up For Newsletter
            </h2>
            <p className="mt-1 text-sm text-primary-foreground/80">
              And receive $20 coupon on your next shopping
            </p>
          </div>
          <div className="flex w-full max-w-md flex-col gap-2 sm:flex-row md:w-auto md:gap-0">
            <input type="email" placeholder="Your email address" className="flex-1 rounded-xl border border-white/45 bg-white px-5 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none sm:rounded-r-none"/>
            <button className="flex items-center justify-center gap-2 rounded-xl bg-surface-dark px-6 py-3 text-sm font-bold text-surface-dark-foreground transition-colors hover:bg-surface-dark/90 sm:rounded-l-none">
              <Send size={16}/> Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </section>);
}
