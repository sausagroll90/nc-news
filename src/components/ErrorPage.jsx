export default function ErrorPage({ error }) {
  return (
    <>
      <h2 class="error-heading">ERROR</h2>
      <p>
        {error && error.status === 404
          ? `404: page not found`
          : "Oops, something went wrong..."}
      </p>
    </>
  );
}
