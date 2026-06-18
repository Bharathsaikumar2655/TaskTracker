using Microsoft.EntityFrameworkCore;
using TaskTracker.Api.Data;

var builder = WebApplication.CreateBuilder(args);

// MVC-style API controllers
builder.Services.AddControllers();

// Razor Pages (used for the read-only /Admin/Tasks view)
builder.Services.AddRazorPages();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// EF Core + SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Allow the React dev server to call the API
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseCors("AllowReactApp");

app.UseRouting();

app.MapControllers();
app.MapRazorPages();

app.Run();
