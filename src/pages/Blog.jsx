import { blogPosts } from "@/data/products";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import Newsletter from "@/components/home/Newsletter";
const blogImages = { "blog-1": blog1, "blog-2": blog2, "blog-3": blog3 };
export default function Blog() {
    return (<>
      <div className="container-custom py-10">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-10">
          Latest Blog
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...blogPosts, ...blogPosts].slice(0, 6).map((post, i) => (<motion.article key={`${post.id}-${i}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass-card-hover rounded-xl overflow-hidden group">
              <div className="aspect-video overflow-hidden">
                <img src={blogImages[post.image]} alt={post.title} className="w-full h-full object-cover image-zoom"/>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><User size={12}/> {post.author}</span>
                  <span className="flex items-center gap-1"><Calendar size={12}/> {post.date}</span>
                </div>
                <h2 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors mb-3 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Read More <ArrowRight size={14}/>
                </span>
              </div>
            </motion.article>))}
        </div>
      </div>
      <Newsletter />
    </>);
}
