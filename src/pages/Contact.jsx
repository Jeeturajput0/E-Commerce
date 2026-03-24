import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Message sent! We'll get back to you shortly.");
        setForm({ name: "", email: "", message: "" });
    };
    return (<div className="container-custom py-10">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-10">
        Contact Us
      </motion.h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h2 className="font-heading font-bold text-xl text-foreground mb-6">Get In Touch</h2>
          <p className="text-muted-foreground mb-8">Have a question or need help? Fill out the form and we'll respond within 24 hours.</p>
          <div className="space-y-6">
            {[
            { icon: MapPin, label: "Address", value: "123 Electronics Ave, Tech City, TC 12345" },
            { icon: Mail, label: "Email", value: "support@electrostore.com" },
            { icon: Phone, label: "Phone", value: "(00) 1234 567891" },
        ].map(({ icon: Icon, label, value }) => (<div key={label} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-primary"/>
                </div>
                <div>
                  <p className="font-heading font-semibold text-foreground text-sm">{label}</p>
                  <p className="text-muted-foreground text-sm">{value}</p>
                </div>
              </div>))}
          </div>
        </motion.div>

        <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card rounded-xl p-8">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
              <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Your name"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="your@email.com"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
              <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" placeholder="How can we help?"/>
            </div>
            <button type="submit" className="w-full py-3 rounded-lg gradient-primary text-primary-foreground font-heading font-bold text-sm flex items-center justify-center gap-2 hover:shadow-[var(--shadow-glow)] transition-all">
              <Send size={16}/> Send Message
            </button>
          </div>
        </motion.form>
      </div>
    </div>);
}
