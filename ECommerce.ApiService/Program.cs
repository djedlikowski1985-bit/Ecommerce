using Microsoft.EntityFrameworkCore;
using ECommerce.ApiService.Data;
using FastEndpoints;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();
builder.Services.AddProblemDetails();
builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();
builder.Services.AddFastEndpoints();


var allowedOrigins = new[]
{
    "http://localhost:4199"
};
const string CorsPolicyName = "AllowLocalDev";
builder.Services.AddCors(options =>
    options.AddPolicy(CorsPolicyName, policy =>
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials()
    )
);


var postgresConnection = builder.Configuration.GetConnectionString("postgresdb");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(postgresConnection));

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    await db.Database.EnsureCreatedAsync();

    if (!await db.Products.AnyAsync())
    {
        db.Products.AddRange(new[]
        {
            new Product { Name = "Laptop Pro 14\"", Description = "High-performance laptop", Price = 1499.99m },
            new Product { Name = "Wireless Mouse", Description = "Ergonomic wireless mouse", Price = 29.99m },
            new Product { Name = "Mechanical Keyboard", Description = "Tactile mechanical keyboard", Price = 89.99m },
            new Product { Name = "27\" 4K Monitor", Description = "Ultra HD display", Price = 399.99m },
            new Product { Name = "USB-C Hub", Description = "Multi-port adapter", Price = 49.99m },
            new Product { Name = "Noise-Cancelling Headphones", Description = "Over-ear ANC headphones", Price = 199.99m },
            new Product { Name = "External SSD 1TB", Description = "Portable NVMe SSD", Price = 129.99m },
            new Product { Name = "Smartwatch", Description = "Fitness and notifications", Price = 179.99m },
            new Product { Name = "Bluetooth Speaker", Description = "Portable speaker", Price = 59.99m },
            new Product { Name = "Webcam 1080p", Description = "HD webcam for video calls", Price = 39.99m }
        });

        await db.SaveChangesAsync();
    }
}

app.UseExceptionHandler();
app.UseCors(CorsPolicyName);

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/openapi/v1.json", "v1");
        c.RoutePrefix = string.Empty; // serve UI at the app root
    });
}

app.MapDefaultEndpoints();
app.UseFastEndpoints();

app.Run();
