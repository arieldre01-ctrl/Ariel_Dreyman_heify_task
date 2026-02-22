# My Work Process

Started with the backend since I wanted to make sure the API works before touching the frontend.

Got express running first then added the routes one by one. The toggle endpoint gave me a small headache because I forgot to parseInt the id param so it wasnt matching anything.

For the frontend I built the components one at a time and tested each one before moving on. Connecting to the backend was straightforward with fetch.

The carousel was the hardest part. My first version just snapped between tasks which looked bad. After some thinking I figured out the clone trick - copy the first item to the end and last item to the beginning so the loop feels seamless. Pretty happy with how it turned out.

Styling came last. Went for a clean earthy look, nothing too fancy.

If I had more time I would add:
- due dates for tasks
- drag and drop reordering
- local storage so tasks survive a page refresh
