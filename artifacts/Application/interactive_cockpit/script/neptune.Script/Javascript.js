var EDI;
var Create = false;

function create_editor() {
    
    CKEDITOR.ClassicEditor.create(document.getElementById("editor1"), {
        toolbar: {
            items: [
                // "exportPDF",
                // "exportWord",
                // "|",
                // "findAndReplace",
                // "selectAll",
                // "|",
                // "bold",
                // "italic",
                // "strikethrough",
                // "underline",
                // "code",
                // "subscript",
                // "superscript",
                // "removeFormat",
                // "|",
                // "bulletedList",
                // "numberedList",
                // "todoList",
                // "|",
                // "outdent",
                // "indent",
                // "|",
                // "undo",
                // "redo",
                // "-",
                // "fontSize",
                // "fontFamily",
                // "fontColor",
                // "fontBackgroundColor",
                // "highlight",
                // "|",
                // "alignment",
                // "|",
                // "link",
                // "uploadImage",
                // "blockQuote",
                // "insertTable",
                // "mediaEmbed",
                // "codeBlock",
                // "htmlEmbed",
                // "|",
                // "specialCharacters",
                // "horizontalLine",
                // "pageBreak",
                // "|",
                // "textPartLanguage",
                // "|",
                // "sourceEditing",
            ],
            shouldNotGroupWhenFull: true,
        },
        list: {
            properties: {
                styles: true,
                startIndex: true,
                reversed: true,
            },
        },
        placeholder: "",
        fontFamily: {
            options: [
                "default",
                "Arial, Helvetica, sans-serif",
                "Courier New, Courier, monospace",
                "Georgia, serif",
                "Lucida Sans Unicode, Lucida Grande, sans-serif",
                "Tahoma, Geneva, sans-serif",
                "Times New Roman, Times, serif",
                "Trebuchet MS, Helvetica, sans-serif",
                "Verdana, Geneva, sans-serif",
            ],
            supportAllValues: true,
        },
        fontSize: {
            options: [10, 12, 14, "default", 18, 20, 22],
            supportAllValues: true,
        },
        htmlSupport: {
            allow: [
                {
                    name: /.*/,
                    attributes: true,
                    classes: true,
                    styles: true,
                },
            ],
        },
        htmlEmbed: {
            showPreviews: true,
        },
        link: {
            decorators: {
                addTargetToExternalLinks: true,
                defaultProtocol: "https://",
                toggleDownloadable: {
                    mode: "manual",
                    label: "Downloadable",
                    attributes: {
                        download: "file",
                    },
                },
            },
        },
        mention: {
            feeds: [
                {
                    marker: "@",
                    feed: [
                        "@apple",
                        "@bears",
                        "@brownie",
                        "@cake",
                        "@cake",
                        "@candy",
                        "@canes",
                        "@chocolate",
                        "@cookie",
                        "@cotton",
                        "@cream",
                        "@cupcake",
                        "@danish",
                        "@donut",
                        "@dragée",
                        "@fruitcake",
                        "@gingerbread",
                        "@gummi",
                        "@ice",
                        "@jelly-o",
                        "@liquorice",
                        "@macaroon",
                        "@marzipan",
                        "@oat",
                        "@pie",
                        "@plum",
                        "@pudding",
                        "@sesame",
                        "@snaps",
                        "@soufflé",
                        "@sugar",
                        "@sweet",
                        "@topping",
                        "@wafer",
                    ],
                    minimumCharacters: 1,
                },
            ],
        },
        removePlugins: [
            "Heading", // Disable heading plugin
            "AIAssistant",
            "CKBox",
            "CKFinder",
            "EasyImage",
            "MultiLevelList",
            "RealTimeCollaborativeComments",
            "RealTimeCollaborativeTrackChanges",
            "RealTimeCollaborativeRevisionHistory",
            "PresenceList",
            "Comments",
            "TrackChanges",
            "TrackChangesData",
            "RevisionHistory",
            "Pagination",
            "WProofreader",
            "MathType",
            "SlashCommand",
            "Template",
            "DocumentOutline",
            "FormatPainter",
            "TableOfContents",
            "PasteFromOfficeEnhanced",
            "CaseChange",
        ],
        readOnly: true // Set editor to read-only mode
    }).then((editor1) => {
        EDI = editor1;
        // Set contenteditable attribute to false
        const editableElement = editor1.editing.view.document.getRoot();
        editor1.editing.view.change((writer) => {
            writer.setAttribute('contenteditable', 'false', editableElement);
        });
    });
}

create_editor()
