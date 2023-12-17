import { http, HttpResponse } from 'msw';

const allPosts = new Map();

export const handlers = [
  http.get('/todos', ({ cookies }) => {
    return HttpResponse.json(
      [
        {
          userId: 1,
          title: 'Wave hello!',
          completed: false,
          id: 1,
        },
        {
          userId: 1,
          title: 'Get Coffee!',
          completed: false,
          id: 2,
        },
      ],

      { status: 200 }
    );
  }),
  http.get('/tpdos', ({ cookies }) => {
    const { session } = cookies;

    if (!session) {
      return new HttpResponse(null, { status: 401 });
    }

    return HttpResponse.json({}, { status: 200 });
  }),
  http.get('/posts', () => {
    return HttpResponse.json(Array.from(allPosts.values()));
  }),
  http.post('/posts', async ({ request }) => {
    // Read the intercepted request body as JSON.
    const newPost = await request.json();

    // Push the new post to the map of all posts.
    allPosts.set(newPost.id, newPost);
    // Don't forget to declare a semantic "201 Created"
    // response and send back the newly created post!
    return HttpResponse.json(newPost, { status: 201 });
  }),
  http.delete('/posts/:id', ({ params }) => {
    // All request path params are provided in the "params"
    // argument of the response resolver.
    const { id } = params;

    // Let's attempt to grab the post by its ID.
    const deletedPost = allPosts.get(id);

    // Respond with a "404 Not Found" response if the given
    // post ID does not exist.
    if (!deletedPost) {
      return new HttpResponse(null, { status: 404 });
    }

    // Delete the post from the "allPosts" map.
    allPosts.delete(id);

    // Respond with a "200 OK" response and the deleted post.
    return HttpResponse.json(deletedPost);
  }),
];
