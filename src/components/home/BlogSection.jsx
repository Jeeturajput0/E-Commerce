import { motion } from "framer-motion";
import { blogPosts } from "@/data/products";
import { Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
const blogImages = { "blog-1": blog1, "blog-2": blog2, "blog-3": blog3 };
export default function BlogSection() {
    return (<section className="section-padding">
      <div className="container-custom">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center text-2xl font-heading font-bold text-foreground md:text-3xl">
          Latest Blog
        </motion.h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {blogPosts.map((post, i) => (<motion.div key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Link to="/blog" className="group block overflow-hidden rounded-2xl bg-white shadow-[0_15px_36px_rgba(22,22,22,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(22,22,22,0.08)]">
                <div className="aspect-video overflow-hidden">
                  <img src={blogImages[post.image]} alt={post.title} className="w-full h-full object-cover image-zoom"/>
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><User size={12}/> {post.author}</span>
                    <span className="flex items-center gap-1"><Calendar size={12}/> {post.date}</span>
                  </div>
                </div>
              </Link>
            </motion.div>))}
        </div>
      </div>
    </section>);
}
