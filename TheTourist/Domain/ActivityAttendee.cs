namespace Domain
{
    public class ActivityAttendee
    {
        public string AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }
        public Guid ActivityId { get; set; }
        public virtual Activity Activity { get; set; }
        public bool IsHost { get; set; }
    }
}