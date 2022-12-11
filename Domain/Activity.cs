namespace Domain
{
    // it can be refered as the MODELS or ENTITY, its the same
    // object relations mapper (ORM)- its the Entity framework.
    // it an abstraction layer for DB, and we no need to write the query directly for DB
    public class Activity
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
    }
}