export default function CartCard2({product}) {
    const getDateAfter7Days = () => {
        const today = new Date();
        today.setDate(today.getDate() + 7); // Add 7 days to today's date
        return today.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short", // "short" for abbreviated month names like "Dec"
            year: "numeric",
        });
    };
    return (
        <div className="flex items-center gap-2"> 
          <img
                    src={product.image}
                    alt="card-image"
                    className="object-fill h-20 w-20"
                />
                <div>
                  <p className="font-bold">{getDateAfter7Days()}</p>
                  <p>{product.title}</p>
                  </div>
          </div>
    )
}