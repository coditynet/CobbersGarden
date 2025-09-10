import Link from "next/link";

const blogs = [
    {
        title: "Planter un arbre",
        description: "Découvrez comment planter un arbre facilement et contribuer à la nature.",
        image: "/assets/img/blogs/planting_tree.jpeg", 
        link: "/planter-un-arbre",
    },

];

export default function BlogsPage() {
    return (
        <main className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Blogs et aide</h1>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {blogs.map((blog, idx) => (
                    <Link
                        key={idx}
                        href={blog.link}
                        className="bg-green-50 rounded-lg shadow hover:shadow-lg transition flex flex-col overflow-hidden"
                        style={{ textDecoration: "none" }}
                    >
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-40 object-fill"
                        />
                        <div className="p-4 flex-1 flex flex-col bg-green-100">
                            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                            <p className="text-gray-600 flex-1">{blog.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}