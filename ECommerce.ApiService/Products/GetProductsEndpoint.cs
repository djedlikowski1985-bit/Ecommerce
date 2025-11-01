using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using ECommerce.ApiService.Data;

namespace ECommerce.ApiService.Products
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public decimal Price { get; set; }
    }

    public class GetProductsEndpoint : EndpointWithoutRequest<List<ProductDTO>>
    {
        private readonly ApplicationDbContext _db;

        public GetProductsEndpoint(ApplicationDbContext db)
        {
            _db = db;
        }

        public override void Configure()
        {
            Get("/products");
            AllowAnonymous();
        }

        public override async Task HandleAsync(CancellationToken ct)
        {
            var products = await _db.Products
                .AsNoTracking()
                .Select(p => new ProductDTO
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description ?? string.Empty,
                    Price = p.Price
                })
                .ToListAsync(ct);

            await Send.OkAsync(products, cancellation: ct);
        }
    }
}
