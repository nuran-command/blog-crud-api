const API = "http://localhost:5090/api/blogs";

async function createBlog() {
  const title = document.getElementById("create-title").value;
  const author = document.getElementById("create-author").value;
  const body = document.getElementById("create-body").value;

  if (!title || !body) return alert("Title and Body are required");

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, author, body })
  });

  document.getElementById("create-title").value = "";
  document.getElementById("create-author").value = "";
  document.getElementById("create-body").value = "";

  loadBlogs();
}

async function loadBlogs() {
  const res = await fetch(API);
  const blogs = await res.json();
  const container = document.getElementById("blogsList");
  container.innerHTML = "";

  blogs.forEach(blog => {
    const div = document.createElement("div");
    div.className = "blog-item";
    div.innerHTML = `
      <p><strong>ID:</strong> ${blog._id}</p>
      <p><strong>Title:</strong> ${blog.title}</p>
      <p><strong>Author:</strong> ${blog.author || "Anonymous"}</p>
      <p><strong>Body:</strong> ${blog.body}</p>
      <p><small>Created: ${new Date(blog.createdAt).toLocaleString()}</small></p>
    `;
    container.appendChild(div);
  });
}

async function updateBlog() {
  const id = document.getElementById("update-id").value;
  const title = document.getElementById("update-title").value;
  const author = document.getElementById("update-author").value;
  const body = document.getElementById("update-body").value;

  if (!id || !title || !body) return alert("ID, Title and Body are required");

  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, author, body })
  });

  document.getElementById("update-id").value = "";
  document.getElementById("update-title").value = "";
  document.getElementById("update-author").value = "";
  document.getElementById("update-body").value = "";

  loadBlogs();
}

async function deleteBlog() {
  const id = document.getElementById("delete-id").value;
  if (!id) return alert("ID is required");

  if (!confirm("Delete this blog?")) return;

  await fetch(`${API}/${id}`, { method: "DELETE" });

  document.getElementById("delete-id").value = "";
  loadBlogs();
}

loadBlogs();