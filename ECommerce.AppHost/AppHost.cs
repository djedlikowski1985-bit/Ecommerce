var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("postgres");
var postgresdb = postgres.AddDatabase("postgresdb");

var apiService = builder.AddProject<Projects.ECommerce_ApiService>("apiservice")
    .WithHttpHealthCheck("/health")
    .WithReference(postgresdb)
    .WaitFor(postgresdb);

var angular = builder.AddNpmApp(
        "angular-frontend",
        "../ECommerce.Frontend",
        scriptName: "start",
        args: new[] { "--port", "4200", "--host", "127.0.0.1" }
    )
    .WithHttpEndpoint(targetPort: 4200)
    .WithReference(apiService);

builder.Build().Run();
