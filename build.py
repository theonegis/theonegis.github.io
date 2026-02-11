import os

def build_homepage():
    # Paths
    template_path = 'template.html'
    output_path = 'index.html'
    sections_dir = 'sections'

    if not os.path.exists(template_path):
        print(f"Error: {template_path} not found.")
        return

    with open(template_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find and replace placeholders
    # Predefined sections
    sections = ['info', 'research', 'students', 'admissions', 'social', 'english']

    import re
    for section_id in sections:
        section_file = os.path.join(sections_dir, f"{section_id}.html")
        # Match <div id="section-name" ...></div>
        pattern = rf'<div id="section-{section_id}"[^>]*>\s*</div>'
        
        if os.path.exists(section_file):
            print(f"Inserting {section_file}...")
            with open(section_file, 'r', encoding='utf-8') as f:
                section_html = f.read()
            
            # Replace the placeholder while preserving its attributes (like class="mt-16")
            def replace_content(match):
                opening_tag = match.group(0).split('>')[0] + '>'
                return f'{opening_tag}{section_html}</div>'
            
            content = re.sub(pattern, replace_content, content)
        else:
            print(f"Warning: {section_file} not found.")

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Successfully built {output_path}")

if __name__ == "__main__":
    build_homepage()
