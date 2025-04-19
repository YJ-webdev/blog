export const createCoupangDeeplink = async () => {
  const keyword = 'good'; // Replace with your actual search keyword
  const res = await fetch(
    `/api/coupang/search?keyword=${encodeURIComponent(keyword)}`,
  );

  if (!res.ok) {
    console.error('Failed to fetch Coupang products');
    return;
  }

  const data = await res.json();
  console.log(data); // This will show the product search results
};
