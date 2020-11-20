export class CreateArticleDto {
  public Title: string;
  public Description: string;
  public Price: number;
  public EAN: string;
  public ReleaseYear: string;
  public Sites: string;
  public Stock: number;

  public LanguageId: string;
  public PublisherId: string;
  public AuthorId: string;
  public SubCategoryId: string;
}
