import os

def parse_markdown_to_tsx(markdown_file, output_dir="./snippets"): # type: ignore

    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    code_blocks = []
    in_code_block = False
    current_code_block = []

    with open(markdown_file, 'r') as file: # type: ignore
        for line in file:
            if line.strip().startswith("```") and not in_code_block:
                in_code_block = True
                current_code_block = []
            elif line.strip().startswith("```") and in_code_block:
                in_code_block = False
                code_blocks.append("\n".join(current_code_block)) # type: ignore
            elif in_code_block:
                current_code_block.append(line.rstrip()) # type: ignore

    for i, code in enumerate(code_blocks): # type: ignore
        with open(os.path.join(output_dir, f"{i + 1}.tsx"), 'w') as tsx_file:
            tsx_file.write(code) # type: ignore

parse_markdown_to_tsx("./page.mdx")