import re

def replace_codeblocks_with_suspense_editor(markdown_file, output_file, snippet_dir="./app/blog/(articles)/react-from-scratch/snippets"):
    
    with open(markdown_file, 'r') as file:
        content = file.read()

    code_block_pattern = re.compile(r"```.*?```", re.DOTALL)
    matches = code_block_pattern.findall(content)

    for i, _ in enumerate(matches):
        replacement = f'<SuspenseEditor filePath="{snippet_dir}/{i + 1}.tsx" />'
        content = content.replace(matches[i], replacement, 1)

    with open(output_file, 'w') as file:
        file.write(content)

replace_codeblocks_with_suspense_editor("./pageold.mdx", "./page-new.mdx")