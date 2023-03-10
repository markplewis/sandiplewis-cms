// Icons:
// https://www.sanity.io/docs/icons-for-data-types
// https://icons.sanity.build/all
import {
  // EyeOpenIcon,
  EditIcon,
  HomeIcon,
  DocumentTextIcon,
  FolderIcon,
  BookIcon,
  StarIcon,
  UserIcon
} from "@sanity/icons";

// TODO: figure out how to implement page previews
// See: https://github.com/sanity-io/nextjs-blog-cms-sanity-v3/blob/main/sanity.config.ts

function splitPaneViews(S, listItem, title, schema, Icon) {
  return listItem
    .title(title)
    .schemaType(schema)
    .icon(Icon)
    .child(
      S.documentTypeList(schema)
        .title(title)
        .child(documentId =>
          S.document()
            .documentId(documentId)
            .schemaType(schema)
            .views([
              S.view.form().icon(EditIcon)
              // TODO: figure out how to implement page previews
              // S.view.component(IframePreview).icon(EyeOpenIcon).title("Web Preview")
            ])
        )
    );
}

// Structure Builder: https://www.sanity.io/docs/structure-builder-reference
// Note: context includes `currentUser` and the client

export const structure = (S, context) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Home page")
        .schemaType("homePage")
        .icon(HomeIcon)
        .child(
          S.document()
            .documentId("homePage")
            .schemaType("homePage")
            .views([
              S.view.form().icon(EditIcon)
              // S.view.component(IframePreview).icon(EyeOpenIcon).title("Web Preview")
            ])
        ),
      ...S.documentTypeListItems()
        .filter(listItem => {
          return listItem.getId() !== "homePage";
        })
        .map(listItem => {
          switch (listItem.getId()) {
            case "author":
              return splitPaneViews(S, listItem, "Authors", "author", UserIcon);
            case "category":
              return splitPaneViews(S, listItem, "Categories", "category", FolderIcon);
            case "novel":
              return splitPaneViews(S, listItem, "Novels", "novel", BookIcon);
            case "shortStory":
              return splitPaneViews(S, listItem, "Short stories", "shortStory", BookIcon);
            case "post":
              return splitPaneViews(S, listItem, "Posts", "post", DocumentTextIcon);
            case "review":
              return listItem.title("Reviews").icon(StarIcon);
            default:
              return listItem;
          }
        })
    ]);

export const defaultDocumentNode = S => {
  return S.document().views([
    S.view.form()
    // S.view.component(JsonView).title('JSON')
  ]);
};
