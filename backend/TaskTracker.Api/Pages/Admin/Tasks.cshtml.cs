using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using TaskTracker.Api.Data;
using TaskTracker.Api.Models;

namespace TaskTracker.Api.Pages.Admin
{
    public class TasksModel : PageModel
    {
        private readonly AppDbContext _context;

        public TasksModel(AppDbContext context)
        {
            _context = context;
        }

        public List<TaskItem> Tasks { get; set; } = new();

        public async Task OnGetAsync()
        {
            Tasks = await _context.Tasks
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();
        }
    }
}
